import { Col, Radio, RadioChangeEvent, Row } from "antd";
import React, { ReactNode, memo, useState } from "react";
import { useNavigate } from "react-router";
import { TableInfoWrapper } from "./style";
import InfoCard from "@/components/InfoCard";

interface IProps {
  children?: ReactNode;
}

const TableInfo: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");

  const navigate = useNavigate();

  // 导入表，跳转到主页
  const doImport = (tableInfo: TableInfoType.TableInfo) => {
    navigate(`/home?table_id=${tableInfo.id}`);
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
            <InfoCard
              title="公开表信息"
              showTag={false}
              onImport={doImport}
              btnText="创建表"
            ></InfoCard>
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          >
            <InfoCard
              title="个人表"
              onImport={doImport}
              btnText="创建表"
              needLogin={true}
            ></InfoCard>
          </Col>
        </Row>
      </div>
    </TableInfoWrapper>
  );
};

export default memo(TableInfo);
