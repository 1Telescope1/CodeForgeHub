import { createModalParamsType } from "@/model/modalParamsType";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import React, { ReactNode, memo, useEffect } from "react";

interface IProps {
  modalParams: createModalParamsType;
  modalVisible: boolean;
  initialValues?: TableInfoType.TableInfo | FieldInfoType.FieldInfo;
  onSubmit: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const CreateModal: React.FC<IProps> = (IProps) => {
  const { modalParams, modalVisible, initialValues, onCancel, onSubmit } =
    IProps;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const success = await modalParams.handleAdd(values);
    if (success) {
      onSubmit?.();
    }
  };

  useEffect(() => {
    if (modalVisible && initialValues) {
      // 设置表单初始值
      form.setFieldsValue({
        [modalParams.columns[0].dataIndex]: initialValues.name,
        [modalParams.columns[1].dataIndex]: initialValues.content,
      });
    }
  }, [modalVisible]);

  return (
    <Modal
      title={modalParams.title}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      maskClosable={false}
    >
      <Typography.Text type="secondary">
        注意，你提交的内容可能会被公开！
      </Typography.Text>
      <div style={{ marginBottom: 16 }} />
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name={modalParams.columns[0].dataIndex}
          label={modalParams.columns[0].title}
          rules={modalParams.columns[0].formItemProps.rules}
        >
          <Input placeholder={modalParams.columns[0].fieldProps.placeholder} />
        </Form.Item>
        <Form.Item
          name={modalParams.columns[1].dataIndex}
          label={modalParams.columns[1].title}
          rules={modalParams.columns[1].formItemProps.rules}
        >
          <TextArea
            rows={6}
            placeholder={modalParams.columns[1].fieldProps.placeholder}
          />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button type="primary" htmlType="submit" style={{ width: 120 }}>
              提交
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(CreateModal);
