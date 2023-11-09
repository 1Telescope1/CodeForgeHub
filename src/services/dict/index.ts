import { request } from "@/utils/request";

export const getDictById=(id:number)=>request<DictType.Dict>(`/dict/get`,'GET',{ id });