import { request } from "@/utils/request";

// 用户登录
export const userLogin = (params: UserType.UserLoginRequest) =>
  request<UserType.UserVO>(`/user/login`, "POST", params);

// 获取当前登录用户
export const getLoginUser = () => request<UserType.UserVO>(`/user/get/login`);
