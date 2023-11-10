import { modalParamsType } from "@/constant/modalParamsType";
import { Button, Form, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { ReactNode, memo } from "react";

interface IProps {
  modalParams: modalParamsType;
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const AutoInputModal: React.FC<IProps> = (IProps) => {
  const { visible, onClose, modalParams } = IProps;
  const { title, placeholder, constant, onFinish } = modalParams;
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={title}
        open={visible}
        footer={null}
        onCancel={onClose}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="content"
            label={
              <>
                {placeholder}
                <Button onClick={() => form.setFieldValue("content", constant)}>
                  导入示例
                </Button>
              </>
            }
            rules={[{ required: true, message: placeholder }]}
          >
            <TextArea placeholder={placeholder} autoSize={{ minRows: 16 }} />
          </Form.Item>
          <Form.Item>
            <Space size="large">
              <Button type="primary" htmlType="submit" style={{ width: 120 }}>
                导入
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AutoInputModal);
