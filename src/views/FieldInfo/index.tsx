import React, { ReactNode, memo, useState } from "react";
import { FieldInfoWrapper } from "./style";
import { Col, Radio, RadioChangeEvent, Row } from "antd";
import { useNavigate } from "react-router";
import InfoCard from "@/components/InfoCard";

interface IProps {
  children?: ReactNode;
}

const FieldInfo: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");

  // 更改布局
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  return (
    <FieldInfoWrapper>
      <div className="top">
        <div className="left">参考或学习字段设计，高效完成建表！</div>
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
              title="公开字段信息"
              showTag={false}
              btnText="创建字段"
            ></InfoCard>
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          >
            <InfoCard
              title="个人字段"
              showTag={false}
              btnText="创建字段"
              needLogin={true}
            ></InfoCard>
          </Col>
        </Row>
      </div>
    </FieldInfoWrapper>
  );
};

export default memo(FieldInfo);
