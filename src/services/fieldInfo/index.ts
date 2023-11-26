import { request } from "@/utils/request";

// 创建
export const addFieldInfo = (data: FieldInfoType.FieldInfoAddRequest) =>
  request<number>(`/field_info/add`, "POST", data);

// 分页获取公共字段列表
export const listFieldInfoByPage = (
  params: FieldInfoType.FieldInfoQueryRequest
) =>
  request<PageInfo<FieldInfoType.FieldInfo>>(
    `/field_info/list/page`,
    "GET",
    params
  );

// 分页获取当前用户的字段列表
export const listMyFieldInfoByPage = (
  params: FieldInfoType.FieldInfoQueryRequest
) =>
  request<PageInfo<FieldInfoType.FieldInfo>>(
    `/field_info/my/list/page`,
    "GET",
    params
  );

// 生成创建字段 SQL
export const generateCreateFieldSql = (data: Object) =>
  request<string>(`/field_info/generate/sql`, "POST", data);

// 删除
export const deleteFieldInfo = (data: DeleteRequest) =>
  request<boolean>(`/field_info/delete`, "POST", data);
