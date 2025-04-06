import fs from 'fs';
import express from 'express';
import swaggerUi from  'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { InputError, AccessError } from './error';
import swaggerDocument from '../swagger.json';
import {
  getEmailFromAuthorization,
  login,
  logout,
  register,
  save,
  assertOwnsListing,
  assertOwnsBooking,
  addListing,
  getListingDetails,
  getAllListings,
  updateListing,
  removeListing,
  publishListing,
  unpublishListing,
  leaveListingReview,
  makeNewBooking,
  getAllBookings,
  removeBooking,
  acceptBooking,
  declineBooking,
} from './service';

const app = express();

app.use(cors()); // 允许跨域请求
app.use(express.json({ limit: '50mb' })); // 解析JSON请求体
app.use(morgan('dev')); // HTTP请求日志
app.use(morgan(':method :url :status')); // API文档

// 错误处理包装器 - 捕获路由处理函数中的异常
const catchErrors = (fn) => async (req, res) => {
  try {
    console.log(`Authorization header is ${req.header('Authorization')}`);
    if (req.method === 'GET') {
      console.log(`Query params are ${JSON.stringify(req.params)}`);
    } else {
      console.log(`Body params are ${JSON.stringify(req.body)}`);
    }
    await fn(req, res);
    save();
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error ocurred' });
    }
  }
};

/***************************************************************
                       User Auth Functions
***************************************************************/

// 认证中间件包装器 - 验证用户身份
const authed = (fn) => async (req, res) => {
  const email = getEmailFromAuthorization(req.header('Authorization'));
  await fn(req, res, email);
};

// 用户注册
app.post(
  '/user/auth/login',
  catchErrors(async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    return res.json({ token });
  }),
);

// 用户登录
app.post(
  '/user/auth/register',
  catchErrors(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await register(email, password, name);
    return res.json({ token });
  }),
);

// 用户登出
app.post(
  '/user/auth/logout',
  catchErrors(
    authed(async (req, res, email) => {
      await logout(email);
      return res.json({});
    }),
  ),
);

/***************************************************************
                       Listing Functions
***************************************************************/

// 获取所有房源
app.get(
  '/listings',
  catchErrors(async (req, res) => {
    return res.json({ listings: await getAllListings() });
  }),
);

// 获取特定房源详情
app.get(
  '/listings/:listingid',
  catchErrors(async (req, res) => {
    const { listingid } = req.params;
    return res.status(200).json({ listing: await getListingDetails(listingid) });
  }),
);

// 创建新房源
app.post(
  '/listings/new',
  catchErrors(
    authed(async (req, res, email) => {
      const { title, address, price, thumbnail, metadata } = req.body;
      return res.status(200).json({
        listingId: await addListing(title, email, address, price, thumbnail, metadata),
      });
    }),
  ),
);

// 更新房源信息
app.put(
  '/listings/:listingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid } = req.params;
      const { title, address, thumbnail, price, metadata } = req.body;
      await assertOwnsListing(email, listingid);
      await updateListing(listingid, title, address, thumbnail, price, metadata);
      return res.status(200).send({});
    }),
  ),
);

// 删除房源
app.delete(
  '/listings/:listingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid } = req.params;
      await assertOwnsListing(email, listingid);
      await removeListing(listingid);
      return res.status(200).send({});
    }),
  ),
);

// 发布房源
app.put(
  '/listings/publish/:listingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid } = req.params;
      const { availability } = req.body;
      await assertOwnsListing(email, listingid);
      await publishListing(listingid, availability);
      return res.status(200).send({});
    }),
  ),
);

// 取消发布房源
app.put(
  '/listings/unpublish/:listingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid } = req.params;
      await assertOwnsListing(email, listingid);
      await unpublishListing(listingid);
      return res.status(200).send({});
    }),
  ),
);

// 留下评论
app.put(
  '/listings/:listingid/review/:bookingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid, bookingid } = req.params;
      const { review } = req.body;
      await leaveListingReview(email, listingid, bookingid, review);
      return res.status(200).send({});
    }),
  ),
);

/***************************************************************
                       Booking Functions
***************************************************************/

app.get(
  '/bookings',
  catchErrors(
    authed(async (req, res, email) => {
      return res.status(200).json({
        bookings: await getAllBookings(),
      });
    }),
  ),
);

app.delete(
  '/bookings/:bookingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { bookingid } = req.params;
      await assertOwnsBooking(email, bookingid);
      await removeBooking(bookingid);
      return res.status(200).send({});
    }),
  ),
);

app.post(
  '/bookings/new/:listingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { listingid } = req.params;
      const { dateRange, totalPrice } = req.body;
      return res.status(200).json({
        bookingId: await makeNewBooking(email, dateRange, totalPrice, listingid),
      });
    }),
  ),
);

app.put(
  '/bookings/accept/:bookingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { bookingid } = req.params;
      await acceptBooking(email, bookingid);
      return res.status(200).json({});
    }),
  ),
);

app.put(
  '/bookings/decline/:bookingid',
  catchErrors(
    authed(async (req, res, email) => {
      const { bookingid } = req.params;
      await declineBooking(email, bookingid);
      return res.status(200).json({});
    }),
  ),
);