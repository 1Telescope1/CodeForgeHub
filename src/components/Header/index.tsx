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
  // borderBottom: "1px solid red"
};

const HeaderIndex: React.FC<IProps> = () => {
  const menuList=[{label:'代码生成',key:'/'},{label:'词库大全',key:'/about'}]

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
              defaultSelectedKeys={["/"]}
              items={menuList.map((item) => {
                const key = item.key;
                return {
                  key,
                  label: `${item.label}`,
                };
              })}
            />
          </div>
          <div className="right">
              <Button type="primary" ghost onClick={()=>pushRouter({key:'login'})}>登录</Button>
          </div>
        </HeaderWrapper>
      </Header>
  );
};

export default memo(HeaderIndex);
