import { AUTO_INPUT_EXAMPLE } from "@/constant/examples";
import { modalParamsType } from "@/constant/modalParamsType";
import { Button, Form, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { ReactNode, memo, useState } from "react";

interface IProps {
  modalParams:modalParamsType
  // onSubmit: (values: TableSchema) => void;
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const AutoInputModal: React.FC<IProps> = (IProps) => {
  const {visible,onClose,modalParams}=IProps
  const {title,placeholder,constant}=modalParams
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  /**
   * 自动生成 schema
   * @param values
   */
  const onFinish = async (values: any) => {
    if (!values.content) {
      return;
    }
    // try {
    //   const res = await getSchemaByAuto(values);
    //   onSubmit?.(res.data);
    // } catch (e: any) {
    //   message.error('导入错误，' + e.message);
    // }
  };


  return (
    <>
      <Modal
        title={title}
        open={visible}
        confirmLoading={confirmLoading}
        onCancel={onClose}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}  preserve={false}>
        <Form.Item
          name="content"
          label={
            <>
              {placeholder}
              <Button
                onClick={() =>
                  form.setFieldValue('content', constant)
                }
              >
                导入示例
              </Button>
            </>
          }
          rules={[{ required: true, message: placeholder }]}
        >
          <TextArea
            placeholder={placeholder}
            autoSize={{ minRows: 16 }}
          />
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
