import React, { ReactNode, memo, useRef } from "react";
import { RegisterWrapper } from "./style";
import { Button, Form, Input, message } from "antd";
import { userRegister } from "@/services/user";
import { useAppDispatch } from "@/store";
import { changeUserAction } from "@/store/modules/user";
import { useNavigate } from "react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
}

const Register: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const pushRoute = (path: string) => {
    navigate(path);
  };

  const [form] = Form.useForm();

  // 用户注册
  const doUserRegister = async (fields: UserType.UserRegisterRequest) => {
    const hide = message.loading("登录中");
    try {
      // 校验表单
      await form.validateFields();

      const res = await userRegister({ ...fields });
      message.success("注册成功");
      dispatch(changeUserAction(res.data));

      navigate("/user/login");
    } catch (e: any) {
      // 显示校验失败的错误提示
      if (e?.errorFields && e.errorFields.length > 0) {
        const errorMessage = e.errorFields[0].errors[0];
        message.error(errorMessage);
      } else {
        message.error(e.message);
      }
    } finally {
      hide();
    }
  };

  type FieldType = {
    userName: string;
    userAccount: string;
    userPassword: string;
    checkPassword: string;
  };

  return (
    <RegisterWrapper>
      <div className="content">
        <div className="header">
          <div className="img">
            <img src={require("@/assets/img/logo.png")} alt="" />
          </div>
          <div className="name">CodeForgeHub</div>
        </div>
        <div className="text">快速生成代码和数据</div>
        <div className="form">
          <Form<FieldType>
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={doUserRegister}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="userName"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                size="large"
                className="inputWidth"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="userAccount"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                size="large"
                className="inputWidth"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号(至少四位)"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="userPassword"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                size="large"
                className="inputWidth"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码(至少八位)"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="checkPassword"
              rules={[{ required: true, message: "请输入确认密码" }]}
            >
              <Input.Password
                size="large"
                className="inputWidth"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入确认密码"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="meta">
          <div
            className="pushLogin"
            onClick={() => pushRoute("/user/login")}
          >
            老用户登录
          </div>
        </div>
        <div className="submit">
          <Button
            type="primary"
            size="large"
            onClick={() => doUserRegister(form.getFieldsValue())}
            style={{ width: 300 }}
          >
            登录
          </Button>
        </div>
      </div>
    </RegisterWrapper>
  );
};

export default memo(Register);
