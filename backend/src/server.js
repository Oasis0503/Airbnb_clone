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
