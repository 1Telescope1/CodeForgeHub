import { message } from "antd";
import { useState } from "react";
import { listFieldInfoByPage } from "@/services/fieldInfo";
import { listTableInfoByPage } from "@/services/tableInfo";

const useCard = () => {
  // 公开数据
  const DEFAULT_PAGE_SIZE = 10;
  const [dataList, setDataList] = useState<
    FieldInfoType.FieldInfo[] | TableInfoType.TableInfo[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadService, setLoadService] = useState<Function>(listFieldInfoByPage);
  const initSearchParams:
    | TableInfoType.TableInfoQueryRequest
    | FieldInfoType.FieldInfoQueryRequest = {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortField: "createTime",
    sortOrder: "descend",
  };
  const [searchParams, setSearchParams] = useState<
    TableInfoType.TableInfoQueryRequest | FieldInfoType.FieldInfoQueryRequest
  >(initSearchParams);

  // 加载数据
  const innerOnLoad = () => {    
    loadService({
      ...searchParams,
      // 只展示已审核通过的
      reviewStatus: 1,
    })
      .then((res: any) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e: any) => {
        message.error("加载失败，" + e.message);
      });
  };

  return {
    dataList,
    setDataList,
    total,
    setTotal,
    loading,
    setLoading,
    listFieldInfoByPage,
    listTableInfoByPage,
    loadService,
    setLoadService,
    searchParams,
    setSearchParams,
    innerOnLoad
  };
};

export default useCard;
