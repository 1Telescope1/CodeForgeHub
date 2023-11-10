import { request } from "@/utils/request";

export const getDictById=(id:number)=>request<Dict>(`/dict/get`,'GET',{ id });