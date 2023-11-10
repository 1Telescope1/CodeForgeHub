import { request } from "@/utils/request";

// 智能获取 schema
export const getSchemaByAuto=(data:GenerateByAutoRequest)=>request<TableSchema>(`/sql/get/schema/auto`,'POST',data)

// 根据 SQL 获取 schema
export const getSchemaBySql=(data:GenerateBySqlRequest)=>request<TableSchema>(`/sql/get/schema/sql`,'POST',data)

// 根据 schema 生成
export const generateBySchema=(data: TableSchema)=>request<GenerateVO>(`/sql/generate/schema`,'POST',data)