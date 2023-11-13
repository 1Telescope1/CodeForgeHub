import { request } from "@/utils/request";

// 创建
export const addTableInfo = (data: TableInfoType.TableInfoAddRequest) =>
  request<number>(`/table_info/add`, "POST", data);

// 分页获取当前用户的资源列表
export const listMyTableInfoByPage = (
  params: TableInfoType.TableInfoQueryRequest
) =>
  request<PageInfo<TableInfoType.TableInfo>>(
    `/table_info/my/list/page`,
    "GET",
    params
  );
