import { listMyAddTableInfoByPage } from "@/services/tableInfo";
import {
  Button,
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  message,
} from "antd";
import React, { ReactNode, memo, useState } from "react";
import { Search, useNavigate } from "react-router";
import { TableInfoWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const TableInfo: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");

  const navigate = useNavigate();

  // 加载我的数据
  const loadMyData = (
    searchParams: TableInfoType.TableInfoQueryRequest,
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

  // 导入表，跳转到主页
  const doImport = (tableInfo: TableInfoType.TableInfo) => {
    navigate(`/?table_id=${tableInfo.id}`);
  };

  // 更改布局
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  return (
    <TableInfoWrapper>
      <div className="top">
        <div className="left">站在巨人的肩膀上，一键导入表并生成模拟数据！</div>
        <div className="right">
          <span style={{ marginRight: "10px" }}>切换布局:</span>
          <Radio.Group onChange={onLayoutChange} value={layout}>
            <Radio.Button value="input">配置</Radio.Button>
            <Radio.Button value="half">同屏</Radio.Button>
            <Radio.Button value="output">结果</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div>
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 2 : 1}
          >
            <Card
              title="公开表信息"
              extra={<Button type="primary" onClick={()=>{navigate('/home')}}>创建表</Button>}
            >
              
            </Card>
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          ></Col>
        </Row>
      </div>
    </TableInfoWrapper>
  );
};

export default memo(TableInfo);
