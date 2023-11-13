import { request } from "@/utils/request";

// 获取当前登录用户
export const getLoginUser=()=>request<UserType.UserVO>(`/user/get/login`)