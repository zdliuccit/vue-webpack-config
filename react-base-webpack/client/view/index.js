import React from 'react'
import { Layout } from 'antd'

const { Sider, Header, Content, Footer } = Layout

class Index extends React.Component {
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    // 设置Sider的minHeight可以使左右自适应对齐
    return (
      <div id='page'>
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
            </Header>
            <Content>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              React-Admin ©2018 Created by 137596665@qq.com </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Index