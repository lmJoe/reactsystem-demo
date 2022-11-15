import { Drawer, Layout } from "antd";
import React, { Component } from "react";
import { ShowBreAdcrumb, ShowFold, ShowMenu, ShowTabs } from "../../setting";
import logo from '../../assets/images/logo192.png'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MyBreadcrumb from "../MyBreadcrumb";
import TabsView from "../TabsView";
import ViewMent from "../ViewMent";
import RouterView from "../../router/RouterView";
import NavBar from "../NavBar";
import './index.css'
const { Header, Content, Footer, Sider } = Layout;

class MyView extends Component{
  state = {
    collapsed:false,
    menuTheme:'dark',
    winInnerWidth:1920,
  }
  toggle = () => {
    let { collapsed } = this.state;
    this.setState({
      collapsed:!this.state.collapsed
    },()=>{
      
    })
  }
  //监控窗口大小
  windowResize = (e) =>{
    const { collapsed } = this.state;
    const w = e && e.target ? e.target.innerWidth : window.innerWidth;
    this.setState({
      winInnerWidth:w
    })
    if(w<920){
      if(collapsed) return
      this.setState({collapsed:true})
    }else{
      if(w > 920 && collapsed){
        if(!collapsed) return;
        this.setState({collapsed:false})
      }
    }
  }
  /**
   * 
   * @returns returnFold 是否显示折叠按钮
   */
  returnFold = () => {
    const { collapsed } = this.state;
    return ShowFold && ShowMenu ? React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,{
      className: 'trigger',
      onClick: this.toggle,
    }) : ''
  }
  returnLogo = () => {
    const { collapsed } = this.state;
    return <div className="logo flex-row-center-center">
      {collapsed ? '' : '二郎神管理系统'}
    </div>
  }
  returnMenu = () => {
    const { collapsed } = this.state;
    /**
     * collapsible展开或者收缩
     */
    return ShowMenu ? 
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="w100 h100 flex-column">
        {this.returnLogo()}
        {/* 
          onRef中的方法viewMenuRef为父组件提供给子组件，方便子组件调用onRef的方法给父组件传递子组件实例，并且可以调用子组件函数
        */}
        <ViewMent onRef={c=>this.viewMenuRef = c} collapsed={collapsed}></ViewMent>
      </div>
    </Sider> : ''
  }
  returnMobileMenu = () => {
    const { collapsed } = this.state;
    return <Drawer
      width="200"
      title={this.returnLogo()}
      headerStyle={{
        backgroundColor:'',
        border:"none",
        padding:0
      }}
      bodyStyle={{
        padding:0,
        display:'flex',
        flexDirection:'column'
      }}
      placement="left"
      closable={false}
      onClose={this.toggle}
      visible={!collapsed}
      key='left'
    >
      <ViewMent onRef={c=>this.viewMenuRef = c} collapsed={collapsed}></ViewMent>
    </Drawer>
  }
  returnBreAdcrumb = () => {
    return ShowBreAdcrumb ? <MyBreadcrumb /> : ''
  }
  returnTabs =() => {
    return ShowTabs ? <TabsView></TabsView> : ''
  }
  // 组件挂载
  componentDidMount(){
    this.windowResize();
    window.addEventListener('resize', this.windowResize)
  }
  //组件将要卸载
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize)
  }
  render() {
    const {winInnerWidth} = this.state;
    const { routes } = this.props;
    return (
      <Layout className="w100 h100">
        {
          //是否显示菜单
          winInnerWidth>600?this.returnMenu():this.returnMobileMenu()
        }
        <Layout className="site-layout">
          <Header className="site-layout-background flex-row-between-center" style={{ padding: 0 }}>
            <div className="flex-row-start-center">
              {
                // 是否显示折叠按钮
                this.returnFold()
              }
              {
                // 是否显示面包屑
                this.returnBreAdcrumb()
              }
            </div>
            {/* 用户信息 退出登录、刷新当前页面等操作 */}
            <NavBar />
          </Header>
          {
            //是否显示选项卡
            this.returnTabs()
          }
          <Content
            className="site-layout-background"
            style={{padding: 24, minHeight: 280, overflow: 'auto'}}
          >
            <RouterView routes={routes}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default MyView;