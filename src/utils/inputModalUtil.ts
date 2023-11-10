import { AUTO_INPUT_EXAMPLE, JSON_INPUT_EXAMPLE, SQL_INPUT_EXAMPLE } from "@/constant/examples";
import { modalParamsType } from "@/constant/modalParamsType";
import { useState } from "react";

const useFormInput = () => {
  // 设置modal参数
 const AutoModal = {
  title: "智能导入",
  placeholder: "请输入表的列名，多个列以【英文或中文逗号】分隔：",
  constant: AUTO_INPUT_EXAMPLE,
};

 const SqlModal = {
  title: "导入建表 SQL",
  placeholder: "请输入建表 SQL 语句",
  constant: SQL_INPUT_EXAMPLE,
};

 const JsonModal = {
  title: "导入Json配置",
  placeholder: "请输入配置 JSON",
  constant: JSON.stringify(JSON_INPUT_EXAMPLE),
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

  return { InputModalVisible, setInputModalVisible, modalParams, handleModalParams };
};

export default useFormInput;
