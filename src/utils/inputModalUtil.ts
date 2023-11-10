import {
  AUTO_INPUT_EXAMPLE,
  JSON_INPUT_EXAMPLE,
  SQL_INPUT_EXAMPLE,
} from "@/constant/examples";
import { modalParamsType } from "@/model/modalParamsType";
import { getSchemaByAuto, getSchemaBySql } from "@/services/sql";
import { message } from "antd";
import { useRef, useState } from "react";

const useFormInput = () => {
  // 获取子组件表单
  const formInputRef: any = useRef();

  // 提交表单
  const importTableSchema = (tableSchema: TableSchema) => {
    formInputRef.current.setFormValues(tableSchema);
    setInputModalVisible(false);
    message.success("导入成功");
  };

  // 设置modal参数
  const AutoModal = {
    title: "智能导入",
    placeholder: "请输入表的列名，多个列以【英文或中文逗号】分隔：",
    constant: AUTO_INPUT_EXAMPLE,
    onFinish: async (values: any) => {
      if (!values.content) {
        return;
      }
      try {
        const res = await getSchemaByAuto(values);
        importTableSchema(res.data);
      } catch (e: any) {
        message.error("导入错误，" + e.message);
      }
    },
  };

  const JsonModal = {
    title: "导入Json配置",
    placeholder: "请输入配置 JSON",
    constant: JSON.stringify(JSON_INPUT_EXAMPLE),
    onFinish: (values: any) => {
      const tableSchema = JSON.parse(values.content);
      importTableSchema(tableSchema);
    },
  };

  const SqlModal = {
    title: "导入建表 SQL",
    placeholder: "请输入建表 SQL 语句",
    constant: SQL_INPUT_EXAMPLE,
    onFinish: async (values: any) => {
      const data = { sql: values.content };

      if (!data.sql) {
        return;
      }
      try {
        const res = await getSchemaBySql(data);
        importTableSchema(res.data);
      } catch (e: any) {
        message.error("导入错误，" + e.message);
      }
    },
  };

  // 设置modal显示或隐藏
  const [InputModalVisible, setInputModalVisible] = useState(false);

  const [modalParams, setModalParams] = useState<modalParamsType>(AutoModal);

  const handleModalParams = (key: string) => {
    switch (key) {
      case "AutoModal":
        setModalParams(AutoModal);
        break;
      case "SqlModal":
        setModalParams(SqlModal);
        break;
      case "JsonModal":
        setModalParams(JsonModal);
        break;
      default:
        break;
    }
    setInputModalVisible(true);
  };

  return {
    InputModalVisible,
    setInputModalVisible,
    modalParams,
    handleModalParams,
    formInputRef
  };
};

export default useFormInput;
