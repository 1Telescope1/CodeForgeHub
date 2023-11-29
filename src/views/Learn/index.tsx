import React, { ReactNode, memo, useEffect, useState } from "react";
import { LearnWrapper } from "./style";
import { RadioChangeEvent, Radio, Row, Col, Card } from "antd";
import { useParams } from "react-router";
import { getLevelByKey } from "@/assets/levels";
import SqlProfile from "./components/SqlProfile";

interface IProps {
  children?: ReactNode;
}

const Learn: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");

  // 更改布局
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  const [level, setLevel] = useState<any>();
  const { levelKey } = useParams();

  useEffect(() => {
    setLevel(getLevelByKey(levelKey as string));
  }, [levelKey]);

  return (
    <LearnWrapper>
      <div className="top">
        <div className="left">练习SQL闯关</div>
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
            {level && <SqlProfile level={level}></SqlProfile>}
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          ></Col>
        </Row>
      </div>
    </LearnWrapper>
  );
};

export default memo(Learn);
