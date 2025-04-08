import { Moment } from 'moment';

// 纯数据接口，不包含修改数据的方法

// 登录注册框错误模型
export interface loginRegisterTextFieldErrorTypes {
  error: boolean;
  display: boolean;
  message: string;
}

// 房间相关模型
export interface BedroomsTypes {
  id: string;
  numOfBeds: number;
  bedType: number;
}

export interface AmenitiesTypes {
  id: string;
  detail: string;
}

export interface PicturesTypes {
  id: string;
  url: string;
  blob: Blob | null;
}

// 住宿相关模型
export interface ListingBoxTypes {
  id: number;
  published: boolean;
  title: string;
  type: number;
  bed: number;
  bathroom: number;
  thumbnail: string;
  svg: number;
  comment: number;
  price: number;
}

export interface ListingDetailTypes {
  id: string;
  title: string;
  address: string;
  amenities: string[];
  bedroom: number[][];
  bathroom: number;
  type: number;
  price: number;
  owner: string;
  postedOn: string;
}

export interface ListingFilterTypes {
  id: number;
  address: string;
  published: boolean;
  title: string;
  type: number;
  bed: number;
  bathroom: number;
  thumbnail: string;
  svg: number;
  comment: number;
  price: number;
  dateRange: {
    start: Moment;
    end: Moment;
  }[];
  history: boolean;
}

// 预订相关模型
export interface MyBookingListTypes {
  id: number;
  start: string;
  end: string;
  status: string;
}

export interface BookingDetailTypes {
  id: number;
  start: string;
  end: string;
  owner: string;
  price: number;
}

