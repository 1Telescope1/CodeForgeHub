import React, { ReactNode, memo, useEffect, useRef, useState } from "react";

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
import InputModal from "@/components/InputModal";
import useInputModal from "@/hooks/useInputModal";
import FormInput from "@/components/FormInput";
import { generateBySchema } from "@/services/sql";
import ImportDrawer from "@/components/ImportDrawer";
import DrawerCard from "@/components/DrawerCard";
import useDrawerCard from "@/hooks/useDrawerCard";
import GenerateResultCard from "@/components/GenerateResultCard";
import InfoCard from "@/components/InfoCard";

interface IProps {
  children?: ReactNode;
}

const Home: React.FC<IProps> = () => {
  //更改布局
  const [layout, setLayout] = useState("half");
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  // inputModal配置
  const {
    InputModalVisible,
    setInputModalVisible,
    modalParams,
    handleModalParams,
    formInputRef,
    uploadProps,
  } = useInputModal();

  const { loadTableData } = useDrawerCard();
  const onLoad = loadTableData();

  const ImportDrawerRef: any = useRef();
  // 控制抽屉显示
  const [importTableDrawerVisible, setImportTableDrawerVisible] =
    useState(false);
  const onImport = (tableInfo: any) => {
    formInputRef.current.setFormValues(JSON.parse(tableInfo.content));
    setImportTableDrawerVisible(false);
    message.success("导入成功");
  };

  const importTableDrawerHandle = () => {
    setImportTableDrawerVisible(true);
  };

  const [result, setResult] = useState<GenerateVO>();
  const [genLoading, setGenLoading] = useState(false);
  // 根据 Schema 生成
  const doGenerateBySchema = async (values: TableSchema) => {
    setGenLoading(true);
    try {
      const res = await generateBySchema(values);
      setResult(res.data);
      message.success("已生成");
    } catch (e: any) {
      message.error("生成错误，" + e.message);
    }
    setGenLoading(false);
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
                <Space size={"large"}>
                  <Button onClick={() => handleModalParams("AutoModal")}>
                    智能导入
                  </Button>
                  <Button onClick={importTableDrawerHandle}>导入表</Button>
                  <Button onClick={() => handleModalParams("JsonModal")}>
                    导入表结构Json配置
                  </Button>
                  <Button onClick={() => handleModalParams("SqlModal")}>
                    导入建表SQL
                  </Button>
                  <Upload {...uploadProps}>
                    <Button>导入 Excel</Button>
                  </Upload>
                </Space>
              </div>
              <FormInput ref={formInputRef} onSubmit={doGenerateBySchema} />
            </Card>
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          >
            <GenerateResultCard result={result} loading={genLoading} />
          </Col>
        </Row>
        <InputModal
          modalParams={modalParams}
          visible={InputModalVisible}
          onClose={() => setInputModalVisible(false)}
        ></InputModal>
        <ImportDrawer
          ref={ImportDrawerRef}
          visible={importTableDrawerVisible}
          onClose={() => setImportTableDrawerVisible(false)}
          title="导入表"
        >
          <InfoCard
              title="个人表"
              showTag={false}
              onImport={onImport}
              btnText="创建表"
            ></InfoCard>
        </ImportDrawer>
      </div>
    </HomeWrapper>
  );
};

export default memo(Home);
