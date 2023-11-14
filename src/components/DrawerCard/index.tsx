import { shallowEqualApp, useAppSelector } from "@/store";
import useCard from "@/utils/cardUtils";
import { Button, Card, Empty, Input, Space } from "antd";
import React, { ReactNode, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  needLogin?: boolean;
  showTag?: boolean;
  onLoad?: (
    searchParams:
      | FieldInfoType.FieldInfoQueryRequest
      | TableInfoType.TableInfoQueryRequest,
    setDataList: (
      dataList: FieldInfoType.FieldInfo[] | TableInfoType.TableInfo[]
    ) => void,
    setTotal: (total: number) => void
  ) => void;
  onImport?: (
    values: FieldInfoType.FieldInfo | TableInfoType.TableInfo
  ) => void;
  pushRoute: string;
  children?: ReactNode;
}

const DrawerCard: React.FC<IProps> = (IProps) => {
  const {
    title,
    needLogin = false,
    showTag = true,
    onLoad,
    onImport,
    pushRoute,
  } = IProps;
  const { loginUser } = useAppSelector(
    (state) => ({
      loginUser: state.user.loginUser,
    }),
    shallowEqualApp
  );
  const navigate = useNavigate();

  const {
    dataList,
    setDataList,
    total,
    setTotal,
    loading,
    setLoading,
    initSearchParams,
    searchParams,
    setSearchParams,
  } = useCard();

  useEffect(() => {
    if (needLogin && !loginUser) {
      return;
    }
    setLoading(true);
    onLoad?.(searchParams, setDataList, setTotal);
    setLoading(false);
  }, [searchParams]);

  return (
    <div>
      <Card
        title={title}
        extra={
          <Button
            onClick={() => {
              navigate(pushRoute);
            }}
            type="primary"
          >
            创建表
          </Button>
        }
      >
        <Space>
          <Input.Search
            placeholder="请输入名称"
            enterButton="搜索"
            onSearch={(value) => {
              setSearchParams({
                ...initSearchParams,
                name: value,
              });
            }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default memo(DrawerCard);
