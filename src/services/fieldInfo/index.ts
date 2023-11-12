import { request } from "@/utils/request";

// 创建
export const addFieldInfo=(data:FieldInfoType.FieldInfoAddRequest)=>request<number>(`/field_info/add`,'POST',data)