import React, { ReactNode, memo, useState } from "react";

import {
  BackTop,
  Button,
  Card,
  Col,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
} from "antd";
import { HomeWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

/**
 * 输入配置视图
 */
// const inputConfigView = (
//   <Card
//     title="输入配置"
//     extra={
//       <Select defaultValue="MySQL" style={{ width: 120 }} disabled>
//         <Select.Option value="MySQL">MySQL</Select.Option>
//       </Select>
//     }
//   >
//     <Space size="large" wrap>
//       <Button
//         type="primary"
//         ghost
//         onClick={() => setAutoInputModalVisible(true)}
//       >
//         智能导入
//       </Button>
//       <Button onClick={() => setImportTableDrawerVisible(true)}>
//         导入表
//       </Button>
//       <Button onClick={() => setJsonInputModalVisible(true)}>导入配置</Button>
//       <Button onClick={() => setSqlInputModalVisible(true)}>
//         导入建表 SQL
//       </Button>
//       <Upload {...uploadProps}>
//         <Button>导入 Excel</Button>
//       </Upload>
//     </Space>
//     <div style={{ marginTop: 16 }} />
//     <FormInput ref={formInputRef} onSubmit={doGenerateBySchema} />
//   </Card>
// );

const Home: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");
  //更改布局
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  return (
    <HomeWrapper>
      <div className="top">
        <div className="left">
          快速生成 SQL 和模拟数据，大幅提高开发测试效率！
        </div>
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
              title="请输入你的配置"
              extra={
                <Select
                  defaultValue="Mysql"
                  style={{ width: 120 }}
                  disabled
                  options={[
                    {
                      value: "Mysql",
                      label: "Mysql",
                    },
                  ]}
                />
              }
            >
              <div>
                <Space size={'large'}>
                <Button>智能导入</Button>
                <Button>导入表</Button>
                <Button>导入配置</Button>
                <Button>导入建表SQL</Button>
                <Button>导入Excel</Button>
                </Space>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          >
            {/* <GenerateResultCard result={result} loading={genLoading} /> */}
            456
          </Col>
        </Row>
      </div>
    </HomeWrapper>
  );
};

export default memo(Home);
