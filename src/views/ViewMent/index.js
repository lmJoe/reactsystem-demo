import { PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { updateBreadcrumb } from "../../reduct/actions/breadcrumb";
import { updateTabsView } from '../../reduct/actions/tabsView'
import { updateOpenkeys,updateSelectedkeys } from "../../reduct/actions/menu";
import { getKeyPathTitle, getMenuFirstLevelId, getOpenKeysForId, menuJson } from "../../utils/menu";

//获取菜单一级节点id,用于展开和关闭
const rootSubmenuKeys = getMenuFirstLevelId()
//获取菜单结构
const items = menuItems();
function menuItems(){
  return menuJson.map((item,index) => {
    return item.children && item.children.length > 0 ? renderSubMenu(item,true) : renderMenuItem(item,true);
  })
}
//菜单有子结构
function renderSubMenu(item,type){
  let child = item.children.map((childItem,childIndex) => {
    return childItem.children &&  childItem.children.length > 0 ? renderSubMenu(childItem) : renderMenuItem(childItem);
  })
  return getItem(item.name,item.id,type ? <PieChartOutlined /> : '',child);
}
//菜单无子结构
function renderMenuItem(item,type){
  return getItem(item.name,item.id,type ? <PieChartOutlined /> : '');
}
function getItem(label, key, icon, children, type){
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
class ViewMent extends Component{
  state = {
    menuTheme:'dark',
    openKeys:[],
  }
  //首次加载或菜单隐藏再次打开时，与本地存储状态同步
  initOpenKeys = () => {
    this.setState({
      openKeys:this.props.openKeys
    })
  }
  routerListen = () => {
    
    //订阅路由改变
    this.pubsubToken = React.$PubSub.subscribe('routeChange',(_,path) => {
      //跳转重新定向，不进行选项卡存储
      if(path == 'redirect') return;
      //获取当前打开的层级中选中的id
      const openKeys = getOpenKeysForId(path);
      //将path增加置keyPath数组中 keyPath第一子元素为选中的id值 第二子元素为页面path
      const keyPath = [...openKeys,path];
      //reverse方法我[1,2,3]  =>  1,2,3
      console.log("keyPath1",keyPath)
      this.undateMenuCommon(openKeys, keyPath.reverse())

    });
  }
  undateMenuCommon = (openKeys, keyPath) => {
    //菜单左侧折叠，禁止展开
    if(!this.props.collapsed){
      //当前及菜单进行路由跳转，存储展开项
      this.setState({openKeys})
    }
    //本地存储
    this.props.updateOpenkeys(openKeys);//存储展开项
    this.props.updateSelectedkeys(keyPath);//存储选中项
    let kpr = JSON.parse(JSON.stringify(keyPath));
    //存储菜单名称
    let title = getKeyPathTitle(kpr.reverse());
    this.props.updateBreadcrumb(title);
    // 添加选项卡
    let {panes} = this.props,
    isPush = true
    for(var i in panes){
        if(panes[i].key == keyPath[0]){
            isPush = false
            break
        }
    }
    if(isPush){
        panes.push({
            label: title[title.length-1],
            key: keyPath[0],
            openKeys,
            selectedKeys: keyPath,
            breadcrumb: title
        })
        this.props.updateTabsView(JSON.parse(JSON.stringify(panes)))
    }

  }
  componentDidMount(){
    //初始换openKeys
    this.initOpenKeys();
    //路由监听
    this.routerListen()
  }
  // 菜单展开关闭事件
  onOpenChange = (keys) => {
    let {openKeys:stateOpenKeys} = this.state;
    //当前点击的id和stateOpenKeys数组中的id相比较是否存在
    const latestOpenKey = keys.find((key) => stateOpenKeys.indexOf(key) === -1);
    //当前点击的latestOpenKey和菜单第一层级中的id相比较是否存在
    let openKeys = rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? keys : latestOpenKey ? [latestOpenKey] : [];
    this.setState({openKeys})
  }
  menuClick = ({ item, key, keyPath, domEvent }) => {
    if(keyPath[0] == this.props.location.pathname) return
    //编程式路由跳转
    this.props.history.push(keyPath[0])
  }
  render(){
    const {menuTheme,openKeys} = this.state;
    const {selectedKeys} = this.props;
    return (
      <Menu
        className="view_menu"
        openKeys = {openKeys}
        selectedKeys = {selectedKeys}
        onClick={this.menuClick}
        onOpenChange={this.onOpenChange}
        theme={menuTheme} 
        mode="inline" 
        items={items}
      >

      </Menu>
    )
  }
}
export default connect(
  state => ({
      openKeys: state.openKeys,
      selectedKeys: state.selectedKeys,
      panes: state.tabsView,
  }),
  {
      updateOpenkeys,
      updateSelectedkeys,
      updateBreadcrumb,
      updateTabsView
  }
)(withRouter(ViewMent));