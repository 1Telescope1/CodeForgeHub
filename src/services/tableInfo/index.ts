import { request } from "@/utils/request";

// 创建
export const addTableInfo=(data:TableInfoType.TableInfoAddRequest)=>request<number>(`/table_info/add`,'POST',data)