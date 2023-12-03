import { shallowEqualApp, useAppSelector } from "@/store";
import {
  Button,
  Descriptions,
  Divider,
  List,
  Popconfirm,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { PaginationConfig } from "antd/es/pagination";
import React, { ReactNode, memo, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router";
import { deleteTableInfo, generateCreateTableSql } from "@/services/tableInfo";
import { deleteFieldInfo, generateCreateFieldSql } from "@/services/fieldInfo";

interface IProps {
  pagination: PaginationConfig;
  loading?: boolean;
  showTag?: boolean;
  dataList: any[];
  onImport?: (values: any) => void;
  children?: ReactNode;
}

const DataInfoList: React.FC<IProps> = (IProps) => {
  const { dataList, pagination, loading, showTag = true, onImport } = IProps;

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportedId, setReportedId] = useState(0);
  const [generateSqlService, setGenerateSqlService] = useState<any>();
  const [deleteService, setDeleteService] = useState<any>();
  const [contentType, setContentType] = useState<string>("field");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/tableInfo") {
      setGenerateSqlService([generateCreateTableSql]);
      setDeleteService([deleteTableInfo]);
      setContentType("table");
    } else if (location.pathname == "/fieldInfo") {
      setGenerateSqlService([generateCreateFieldSql]);
      setDeleteService([deleteFieldInfo]);
      setContentType("field");
    }
  }, []);

  const { loginUser } = useAppSelector(
    (state) => ({
      loginUser: state.user.loginUser,
    }),
    shallowEqualApp
  );

  // 删除节点
  const doDelete = async (id: number) => {
    console.log("删除");

    const hide = message.loading("正在删除");
    if (!id) return true;
    try {
      await deleteService[0]({
        id,
      });
      message.success("操作成功");
    } catch (e: any) {
      message.error("操作失败，" + e.message);
    } finally {
      hide();
    }
  };

  // 生成sql代码
  const generateCreateSql = async (id: number) => {
    generateSqlService[0]({ id })
      .then((res: any) => {
        copy(res.data);
        message.success("复制建表 SQL 成功");
      })
      .catch((e: any) => {
        message.error("复制失败，" + e.message);
      });
  };


  return (
    <div className="data-info-list">
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={pagination}
        dataSource={dataList}
        renderItem={(item, index) => {
          const content: any = JSON.parse(item.content);
          return (
            <List.Item
              key={index}
              extra={
                onImport && (
                  <Button
                    onClick={() => {
                      onImport(item);
                    }}
                  >
                    导入
                  </Button>
                )
              }
            >
              {contentType == "table" ? (
                <Descriptions
                  title={
                    <Space align="center">
                      <div>{item.name}</div>
                      <div>
                        {showTag && item.reviewStatus === 1 && (
                          <Tag color="success">公开</Tag>
                        )}
                        {item.userId === 1 && <Tag color="gold">官方</Tag>}
                      </div>
                    </Space>
                  }
                  column={2}
                >
                  <Descriptions.Item label="表名">
                    {content.tableName}
                  </Descriptions.Item>
                  <Descriptions.Item label="表注释">
                    {content.tableComment ?? "无"}
                  </Descriptions.Item>
                  <Descriptions.Item label="字段列表">
                    {content.fieldList
                      .map((field:any) => field.fieldName)
                      .join(", ")}
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                <Descriptions
                title={
                  <Space align="center">
                    <div>{item.name}</div>
                    <div>
                      {showTag && item.reviewStatus === 1 && (
                        <Tag color="success">公开</Tag>
                      )}
                      {item.userId === 1 && <Tag color="gold">官方</Tag>}
                    </div>
                  </Space>
                }
                column={3}
              >
                <Descriptions.Item label="字段名">
                  {content.fieldName}
                </Descriptions.Item>
                <Descriptions.Item label="类型">
                  {content.fieldType ?? '无'}
                </Descriptions.Item>
                <Descriptions.Item label="注释">
                  {content.comment ?? '无'}
                </Descriptions.Item>
                <Descriptions.Item label="默认值">
                  {content.defaultValue ?? '无'}
                </Descriptions.Item>
                <Descriptions.Item label="自增">
                  {content.autoIncrement ? '是' : '否'}
                </Descriptions.Item>
                <Descriptions.Item label="主键">
                  {content.primaryKey ? '是' : '否'}
                </Descriptions.Item>
                <Descriptions.Item label="非空">
                  {content.notNull ? '是' : '否'}
                </Descriptions.Item>
                <Descriptions.Item label="onUpdate">
                  {content.onUpdate ?? '无'}
                </Descriptions.Item>
              </Descriptions>
              )}
              <Space
                split={<Divider type="vertical" />}
                style={{ fontSize: 14 }}
              >
                <Typography.Text type="secondary">
                  {item.createTime.toString().split("T")[0]}
                </Typography.Text>
                <Button type="text" onClick={() => generateCreateSql(item.id)}>
                  复制语句
                </Button>
                <Button
                  type="text"
                  onClick={() => {
                    setReportedId(item.id);
                    setReportModalVisible(true);
                  }}
                >
                  举报
                </Button>
                {loginUser && loginUser.id === item.userId && (
                  <Popconfirm
                    title="你确定要删除么？"
                    onConfirm={() => {
                      doDelete(item.id);
                    }}
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
                )}
              </Space>
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};

export default memo(DataInfoList);
