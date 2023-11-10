import { request } from "@/utils/request";

// 获取列表
export const getDictById=(id:number)=>request<DictType.Dict>(`/dict/get`,'GET',{ id });

// 获取当前用户可选的全部词库列表
export const listMyDict=(params: DictType.DictQueryRequest)=>request<DictType.Dict[]>(`/dict/my/list`,'GET',params)