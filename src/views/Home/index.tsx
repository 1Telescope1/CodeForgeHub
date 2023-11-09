import React,{ReactNode,memo} from 'react'

import { Layout, Space } from 'antd';
const { Content } = Layout;



const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};


interface IProps {
  children?:ReactNode
}

const Home: React.FC<IProps> = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Content style={contentStyle}>Content</Content>
    </Layout>
  </Space>
  )
}

export default memo(Home)
