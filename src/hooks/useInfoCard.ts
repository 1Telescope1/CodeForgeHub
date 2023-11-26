import { listFieldInfoByPage, listMyFieldInfoByPage } from "@/services/fieldInfo";
import {
  listMyAddTableInfoByPage,
  listTableInfoByPage,
} from "@/services/tableInfo";
import { shallowEqualApp, useAppSelector } from "@/store";
import { message } from "antd";
import { useState } from "react";

const useInfoCard = () => {
  const { loginUser } = useAppSelector(
    (state) => ({
      loginUser: state.user.loginUser,
    }),
    shallowEqualApp
  );

  // 默认分页大小
  const DEFAULT_PAGE_SIZE = 10;
  // 公开数据
  const [dataList, setDataList] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const initSearchParams = {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortField: "createTime",
    sortOrder: "descend",
  };
  const [searchParams, setSearchParams] = useState<any>(initSearchParams);

  // 公开表大全
  const publicTableLoad = async () => {
    listTableInfoByPage({
      ...searchParams,
      // 只展示已审核通过的
      reviewStatus: 1,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error("加载失败，" + e.message);
      });
  };
  // 个人表大全
  const privateTableLoad = async (
    searchParams: any,
    setDataList: (dataList: TableInfoType.TableInfo[]) => void,
    setTotal: (total: number) => void
  ) => {
    listMyAddTableInfoByPage(searchParams)
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error("加载失败，" + e.message);
      });
  };
  // 公开字段大全
  const publicFieldLoad = async () => {
    listFieldInfoByPage({
      ...searchParams,
      // 只展示已审核通过的
      reviewStatus: 1,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error("加载失败，" + e.message);
      });
  };
  // 个人字段大全
  const privateFieldLoad = async (
    searchParams: FieldInfoType.FieldInfoQueryRequest,
    setDataList: (dataList: FieldInfoType.FieldInfo[]) => void,
    setTotal: (total: number) => void
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

  return {
    loginUser,
    dataList,
    setDataList,
    total,
    setTotal,
    loading,
    setLoading,
    initSearchParams,
    searchParams,
    setSearchParams,
    publicTableLoad,
    privateTableLoad,
    publicFieldLoad,
    privateFieldLoad,
    DEFAULT_PAGE_SIZE,
  };
};

export default useInfoCard;
