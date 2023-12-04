import React, { ReactNode, memo } from "react";

import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  MenuProps,
  message,
} from "antd";
import { HeaderWrapper } from "./style";
import { useLocation, useNavigate } from "react-router";
import { shallowEqualApp, useAppDispatch, useAppSelector } from "@/store";
import { LogoutOutlined } from "@ant-design/icons";
import { userLogout } from "@/services/user";
import { changeUserAction } from "@/store/modules/user";
const { Header } = Layout;

interface IProps {
  children?: ReactNode;
}

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 64,
  paddingInline: 40,
  lineHeight: "64px",
  backgroundColor: "rgb(248,249,250)",
};

const HeaderIndex: React.FC<IProps> = () => {
  const menuList = [
    { label: "代码生成", key: "/home" },
    // { label: "词库大全", key: "/dict" },
    { label: "表大全", key: "/tableInfo" },
    { label: "字段大全", key: "/fieldInfo" },
    // { label: "学习", key: "/learn/level1" },
    { label: "关卡", key: "/levels" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const pushRouter = (e: any) => {
    navigate(e.key);
  };

  const { loginUser } = useAppSelector(
    (state) => ({
      loginUser: state.user.loginUser,
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "lagout") {
      try {
        await userLogout();
        message.success("已退出登录");
      } catch (e: any) {
        message.error("操作失败");
      }
    }
    dispatch(changeUserAction(null));
    navigate("/user/login");
  };

  const items: MenuProps["items"] = [
    {
      label: loginUser?.userName,
      key: "current",
      disabled: true,
    },
    {
      label: "退出登录",
      key: "logout",
      danger: true,
    },
  ];

  return (
    <Header style={headerStyle}>
      <HeaderWrapper>
        <div className="left">
          <div className="img">
            <img src={require("@/assets/logo.png")} alt="" />
          </div>
          <div className="content">CodeForgeHub</div>
        </div>
        <div className="center">
          <Menu
            onClick={pushRouter}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["/home"]}
            items={menuList}
            selectedKeys={[location.pathname]}
          />
        </div>
        <div className="right">
          {loginUser ? (
            <Dropdown menu={{ items, onClick }}>
              <div>
                <Avatar>{loginUser.userName ?? "无"}</Avatar>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              ghost
              onClick={() => pushRouter({ key: "/user/login" })}
            >
              登录
            </Button>
          )}
        </div>
      </HeaderWrapper>
    </Header>
  );
};

export default memo(HeaderIndex);
