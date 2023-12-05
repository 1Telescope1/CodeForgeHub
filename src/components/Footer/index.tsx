import React, { ReactNode, memo } from "react";

import { Layout, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { GithubStyle } from "./style";
const { Footer } = Layout;

interface IProps {
  children?: ReactNode;
}

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "black",
  backgroundColor: "rgb(239,239,239)",
};

const FooterIndex: React.FC<IProps> = () => {
  return (
    <Footer style={footerStyle}>
      <div>CodeForgeHub</div>
      <GithubStyle
        onClick={() =>
          window.open("https://github.com/1Telescope1/CodeForgeHub", "_blank")
        }
      >
        <GithubOutlined></GithubOutlined>
        <span style={{ marginLeft: 5 }}>代码已开源</span>
      </GithubStyle>
    </Footer>
  );
};

export default memo(FooterIndex);
