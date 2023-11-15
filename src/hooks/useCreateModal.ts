import { createModalParamsType } from "@/model/modalParamsType";
import { addFieldInfo } from "@/services/fieldInfo";
import { addTableInfo } from "@/services/tableInfo";
import { message } from "antd";
import { useState } from "react";

const useCreateModal = () => {
  const colums = [
    {
      title: "名称",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入名称" }],
      },
      fieldProps: {
        autoFocus: true,
        placeholder: "请输入中文名称",
      },
    },
    {
      title: "内容（不建议在此处修改）",
      dataIndex: "content",
      formItemProps: {
        rules: [{ required: true, message: "请输入内容" }],
      },
      fieldProps: {
        autoFocus: true,
        placeholder: "请输入",
      },
    },
  ];

  const FieldInfoCreateModal: createModalParamsType = {
    title: "保存字段信息（后续可直接导入）",
    columns: colums,
    //添加节点
    handleAdd: async (values: FieldInfoType.FieldInfo) => {
      const hide = message.loading("正在添加");
      try {
        await addFieldInfo({ ...values } as FieldInfoType.FieldInfoAddRequest);
        hide();
        message.success("添加成功");
        return true;
      } catch (e: any) {
        hide();
        message.error("添加失败，" + e.message);
        return false;
      }
    },
  };

  const TableInfoCreateModal: createModalParamsType = {
    title: "保存表信息（后续可直接导入）",
    columns: colums,
    // 添加节点
    handleAdd: async (fields: TableInfoType.TableInfo) => {
      const hide = message.loading("正在添加");
      try {
        await addTableInfo({ ...fields } as TableInfoType.TableInfoAddRequest);
        hide();
        message.success("添加成功");
        return true;
      } catch (e: any) {
        hide();
        message.error("添加失败，" + e.message);
        return false;
      }
    },
  };

  // 初始数据
  const [initialValues, setInitialValues] = useState<
    FieldInfoType.FieldInfo | TableInfoType.TableInfo
  >();

  // modal数据
  const [modalParams, setModalParams] =
    useState<createModalParamsType>(FieldInfoCreateModal);

  // 设置modal显示或隐藏
  const [CreateModalVisible, setCreateModalVisible] = useState(false);

  return {
    modalParams,
    setModalParams,
    CreateModalVisible,
    setCreateModalVisible,
    FieldInfoCreateModal,
    TableInfoCreateModal,
    initialValues,
    setInitialValues,
  };
};

export default useCreateModal;
