import React, { ReactNode, memo } from "react";

import { Layout,Menu,Button } from "antd";
import { HeaderWrapper } from "./style";
import { useNavigate } from "react-router";
const { Header} = Layout;

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
  const menuList=[{label:'代码生成',key:'/home'},{label:'词库大全',key:'/dict'},{label:'表大全',key:'/tableInfo'}]

  const navigate=useNavigate()
  const pushRouter=(e:any)=>{
    navigate(e.key)
  }

  return (
      <Header style={headerStyle}>
        <HeaderWrapper>
          <div className="left">
            <div className="img">
              <img src={require("@/assets/logo.png")} alt="" />
            </div>
            <div className="content">
              CodeForgeHub
            </div>
          </div>
          <div className="center">
          <Menu
            onClick={pushRouter}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["/home"]}
              items={menuList}
            />
          </div>
          <div className="right">
              <Button type="primary" ghost onClick={()=>pushRouter({key:'/user/login'})}>登录</Button>
          </div>
        </HeaderWrapper>
      </Header>
  );
};

export default memo(HeaderIndex);
