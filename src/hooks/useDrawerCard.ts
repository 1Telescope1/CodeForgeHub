import { message } from "antd";
import { useState } from "react";
import {
  listFieldInfoByPage,
  listMyFieldInfoByPage,
} from "@/services/fieldInfo";
import {
  listMyTableInfoByPage,
  listTableInfoByPage,
} from "@/services/tableInfo";
import { shallowEqualApp, useAppSelector } from "@/store";

const useDrawerCard = () => {
  const { loginUser } = useAppSelector(
    (state) => ({
      loginUser: state.user.loginUser,
    }),
    shallowEqualApp
  );

  // 公开数据
  const DEFAULT_PAGE_SIZE = 10;
  const [dataList, setDataList] = useState<
    FieldInfoType.FieldInfo[] | TableInfoType.TableInfo[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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

  // 未登录的卡片请求
  const noLoginTableService = (
    searchParams: any,
    setDataList: any,
    setTotal: any
  ) => {
    listTableInfoByPage({
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
  const noLoginFieldService = (
    searchParams: any,
    setDataList: any,
    setTotal: any
  ) => {
    listFieldInfoByPage({
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
  // 登录的卡片请求
  const loginTableSerbice = (
    searchParams: any,
    setDataList: any,
    setTotal: any
  ) => {
    listMyTableInfoByPage({
      ...searchParams,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error("加载失败，" + e.message);
      });
  };
  const loginFieldSerbice = (
    searchParams: any,
    setDataList: any,
    setTotal: any
  ) => {
    listMyFieldInfoByPage(searchParams)
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error("加载失败，" + e.message);
      });
  };

  const loadTableData = () => {
    if (loginUser) {
      return loginTableSerbice;
    } else {
      return noLoginTableService;
    }
  };

  const loadFieldData = () => {
    if (loginUser) {
      return loginFieldSerbice;
    } else {
      return noLoginFieldService;
    }
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
    searchParams,
    setSearchParams,
    loadTableData,
    loadFieldData,
    initSearchParams,
  };
};

export default useDrawerCard;
