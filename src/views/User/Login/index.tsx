import React, { ReactNode, memo, useRef } from "react";
import { LoginWrapper } from "./style";
import { Button, Form, Input, message } from "antd";
import { userLogin } from "@/services/user";
import { useAppDispatch } from "@/store";
import { changeUserAction } from "@/store/modules/user";
import { useNavigate } from "react-router";
import { CloseOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
}

const Login: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const pushRoute = (path: string) => {
    navigate(path);
  };

  const [form] = Form.useForm();
  const initialValues = {
    userAccount: 'test',
    userPassword: '12345678',
  };

  // 用户登录
  const doUserLogin = async (fields: UserType.UserLoginRequest) => {
    const hide = message.loading("登录中");
    try {
      // 校验表单
      await form.validateFields();

      const res = await userLogin({ ...fields });
      message.success("登录成功");
      dispatch(changeUserAction(res.data));

      navigate("/home");
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
    userAccount?: string;
    userPassword?: string;
  };

  return (
    <LoginWrapper>
      <div className="content">
        <div className="header">
          <div className="img">
            <img src={require("@/assets/logo.png")} alt="" />
          </div>
          <div className="name">CodeForgeHub</div>
        </div>
        <div className="text">快速生成代码和数据</div>
        <div className="form">
          <Form
            name="basic"
            form={form}
            initialValues={initialValues}
            onFinish={doUserLogin}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="userAccount"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                size="large"
                className="inputWidth"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
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
                placeholder="请输入密码"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="meta">
          <div
            className="pushRegister"
            onClick={() => pushRoute("/user/register")}
          >
            新用户注册
          </div>
          <div className="home" onClick={() => pushRoute("/home")}>
            返回首页
          </div>
        </div>
        <div className="submit">
          <Button
            type="primary"
            size="large"
            onClick={() => doUserLogin(form.getFieldsValue())}
            style={{ width: 300 }}
          >
            登录
          </Button>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default memo(Login);
