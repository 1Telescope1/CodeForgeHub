import customLevels from "@/assets/levels/customLevels";
import mainLevels from "@/assets/levels/mainLevels";
import { Button, Card, Col, List, Row } from "antd";
import React, { ReactNode, memo } from "react";
import { LevelsWrapper } from "./style";
import { useNavigate } from "react-router";

interface IProps {
  children?: ReactNode;
}

const Levels: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const pushLevel = (item: LevelType) => {
    navigate(`/learn/${item.key}`);
  };

  return (
    <LevelsWrapper>
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24}>
          <Card title="主线关卡">
            <List
              itemLayout="horizontal"
              pagination={{ position: "bottom" }}
              dataSource={mainLevels}
              renderItem={(item, index) => (
                <List.Item
                  extra={<Button onClick={() => pushLevel(item)}>挑战</Button>}
                >
                  <div>{`${index + 1}、${item.title}`}</div>
                </List.Item>
              )}
            ></List>
          </Card>
        </Col>
        <Col xl={12} md={24}>
          <Card title="自定义关卡">
            <List
              itemLayout="horizontal"
              pagination={{ position: "bottom" }}
              dataSource={customLevels}
              renderItem={(item, index) => (
                <List.Item
                  extra={<Button onClick={() => pushLevel(item)}>挑战</Button>}
                >
                  <div>{`${index + 1}、${item.title}`}</div>
                </List.Item>
              )}
            ></List>
          </Card>
        </Col>
      </Row>
    </LevelsWrapper>
  );
};

export default memo(Levels);
