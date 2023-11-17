import useInfoCard from "@/hooks/useInfoCard";
import { Button, Card, Empty, Input, Space } from "antd";
import React, { ReactNode, memo, useEffect } from "react";
import { useNavigate } from "react-router";

interface IProps {
  title?: string;
  needLogin?: boolean;
  showTag?: boolean;
  btnText: string;
  onLoad?: (
    searchParams: any,
    setDataList: (dataList: any) => void,
    setTotal: (total: number) => void
  ) => void;
  onImport?: (values: any) => void;
  children?: ReactNode;
}

const InfoCard: React.FC<IProps> = (IProps) => {
  const {
    title,
    needLogin = false,
    showTag = true,
    onLoad,
    onImport,
    btnText,
  } = IProps;

  const navigate = useNavigate();

  const {
    loginUser,
    initSearchParams,
    dataList,
    setDataList,
    total,
    setTotal,
    loading,
    setLoading,
    searchParams,
    setSearchParams,
  } = useInfoCard();

  // 加载数据
  useEffect(() => {
    // 需要登录
    if (needLogin && !loginUser) {
      return;
    }
    setLoading(true);
    if (onLoad) {
      onLoad(searchParams, setDataList, setTotal);
    } 
    setLoading(false);
    
    
  }, [searchParams]);

  return (
    <Card
      title={title}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/home");
          }}
        >
          {btnText}
        </Button>
      }
    >
      {!needLogin || loginUser ? (
        <>
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
            ></Input.Search>
          </Space>
        </>
      ) : (
        <Empty
          description={
            <Button
              onClick={() => {
                navigate("/user/login");
              }}
              type="primary"
              ghost
              style={{ marginTop: 8 }}
            >
              请先登录
            </Button>
          }
        ></Empty>
      )}
    </Card>
  );
};

export default memo(InfoCard);
