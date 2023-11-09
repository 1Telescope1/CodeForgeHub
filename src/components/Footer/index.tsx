import React, { ReactNode, memo } from "react";

import { Layout, Space } from "antd";
const { Header, Footer, Content } = Layout;

interface IProps {
  children?: ReactNode;
}

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const FooterIndex: React.FC<IProps> = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

export default memo(FooterIndex);
