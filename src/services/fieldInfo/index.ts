import { request } from "@/utils/request";

// 创建
export const addFieldInfo = (data: FieldInfoType.FieldInfoAddRequest) =>
  request<number>(`/field_info/add`, "POST", data);

// 分页获取列表
export const listFieldInfoByPage = (
  params: FieldInfoType.FieldInfoQueryRequest
) =>
  request<PageInfo<FieldInfoType.FieldInfo>>(
    `/field_info/list/page`,
    "GET",
    params
  );