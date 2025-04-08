import { SnackbarStatus } from "@/types";
import { ListingBoxTypes, ListingFilterTypes } from "./models";

// 包含状态及其修改方法

// Token相关状态
export interface TokenState {
  token: string | null;
  email: string | null;
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
}

// 页面导航相关状态
export interface PageState {
  page: number;
  setPage: (page: number) => void;
}

// 主机相关状态
export interface HostState {
  id: number | null;
  setHostId: (id: number | null) => void;
}

// 发布列表相关状态
export interface PublishedState {
  published: ListingBoxTypes[];
  unpublished: ListingBoxTypes[];
  currentList: ListingBoxTypes[];
  setPublished: (published: ListingBoxTypes[]) => void;
  setUnpublished: (unpublished: ListingBoxTypes[]) => void;
  setCurrentList: (currentList: ListingBoxTypes[]) => void;
}

// Snackbar相关状态
export interface CustomerSnackbarState {
  message: string;
  open: boolean;
  status: SnackbarStatus;
  showSnackbar: (message: string, status: SnackbarStatus) => void;
  closeSnackbar: () => void;
}

// 错误提示相关状态
export interface AlertErrorState {
  title: string;
  message: string;
  showAlertError: (title: string, message: string) => void;
  closeAlertError: () => void;
}

// 当前列表相关状态
export interface CurrentListingState {
  current: number[];
  setCurrent: (current: number[]) => void;
}

// 列表排序相关状态
export interface NormalOrderState {
  normal: {[key: string]: ListingFilterTypes};
  order: number[];
  setOrder: (order: number[]) => void;
  setNormal: (normal: {[key: string]: ListingFilterTypes}) => void;
}

// 日期过滤相关状态
export interface FilterDateState {
  time: string[] | null;
  setTime: (time: string[] | null) => void;
}