import { Tabs } from "antd";
import {connect} from 'react-redux'
import { Component } from "react";
import { withRouter } from "react-router";
import { updateTabsView } from "../../reduct/actions/tabsView";
import TabPane from "antd/lib/tabs/TabPane";
import './index.css'
class TabsView extends Component{
  state = {
    show:false,
    selectedTag:{},
    left: 0,
    top: 0,
  }
  //选项卡选中事件
  onChange = (activeKey) => {
    // if(this.state.selectedTag.path != path){
    //   this.setState({show: false})
    // }
    this.props.history.push(activeKey);
  }
  //新增和删除页签的回调，在 type="editable-card" 时有效
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  //找到点击节点对应选项卡最外层结构
  findParentNode = (domNode) => {
    let {className} = domNode;
    if(className.includes('ant-tabs-nav-wrap') || className.includes('ant-tabs-nav') || className.includes('ant-tabs-dropdown-menu-item')) return false
    if((className.includes('ant-tabs-tab') && !domNode.getAttribute('role'))){
      return domNode
    } else {
      return this.findParentNode(domNode.parentNode)
    }
  }
  //右击事件
  _handleContextMenu = (event) => {
    event.preventDefault();
    let dom = this.findParentNode(event.target);
    if(!dom) return;
    let routeDom = dom.firstChild;
    let selectedTag = {
      path: '/' + routeDom.getAttribute('id').split('/').slice(1).join('/'),
      title:routeDom.textContent,
      isSelected:routeDom.getAttribute('aria-selected') == 'true' ? true : false,
    }
    this.setState({
      left:dom.offsetLeft,
      top:dom.offsetHeight + 10,
      show:true,
      selectedTag
    })
  }
  //点击其他位置需要隐藏菜单
  handleClick = (event) => {
    const wasOutside = !(event.target.contains === this.contextMenu);
    if (wasOutside) this.setState({show: false});
  }
  //选项卡滚动 隐藏菜单
  handleScroll = () => {
    let {show} = this.state;
    if(show) this.setState({show:false})
  }
  componentDidMount = () => {
    //绑定事件监听
    document.addEventListener('click', this.handleClick);
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount = () => {
    //组件卸载移除事件监听
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('scroll', this.handleScroll);
  }
  // 路由跳转重定向
  redirectPath = (redirect) => {
    this.props.history.push('/redirect', { redirect })
  }
  // 刷新页面
  refreshSelectedTag = () => {
      let {selectedTag} = this.state
      this.redirectPath(selectedTag.path)
  }
  closeOthersTags = () => {
    let { panes,updateTabsView } = this.props;
    let { selectedTag:{ path, isSelected }} = this.state;
    let arr = panes.filter(pane => {
      return (pane.closable != undefined && !pane.closable) || pane.key == path;
    })
    updateTabsView(JSON.parse(JSON.stringify(arr)))
    // 若当前项不是打开项，则路由跳转到此页面
    if(!isSelected){
      this.redirectPath(path)
    }
  }
  //关闭全部
  closeAllTags = () => {
    let { panes,updateTabsView } = this.props;
    let arr = panes.filter((pane,index) => {
      return pane.closable != undefined && !pane.closable;
    })
    updateTabsView(JSON.parse(JSON.stringify(arr)))
    this.redirectPath(arr[0].key)
  }
  //关闭当前页面
  closeSelectedTag = () => {
    this.remove(this.state.selectedTag.path)
  }
  remove = targetKey => {
    let { selectedKeys,panes,updateTabsView,history } = this.props;
    const activeKey = selectedKeys && selectedKeys.length ? selectedKeys[0] : '';
     // 移除项为当前打开项，删除并打开上次路由
    let i = panes.findIndex((item) => item.key === targetKey);
    panes.splice(i,1);
    updateTabsView(JSON.parse(JSON.stringify(panes)));
    //关闭当前项 打开当前项的后一个
    //如果当前项是最后一项，则打开前一项
    if(targetKey == activeKey){
      this.redirectPath(panes[i] ? panes[i].key : panes[i-1].key )
    }
  }
  //是否显示关闭当前
  isAffix = () =>{
    let { selectedTag } = this.state;
    return selectedTag.isSelected
  }
  closeLeftTags = () => {
    
  }
  closeRightTags = () => {
    
  }
  isFirstView = () =>{

  }
  isLastView = () =>{

  }
  render () {
    const {top, left, show} = this.state
    const {selectedKeys, panes} = this.props;
    const activeKey = selectedKeys && selectedKeys.length ? selectedKeys[0] : ''
    return (
      <div className="pr" onContextMenu={this._handleContextMenu}>
        <Tabs
          hideAdd
          activeKey={activeKey}
          type="editable-card"
          tabBarGutter={5}
          tabBarStyle={{marginBottom: 0, padding: '5px 10px'}}
          defaultActiveKey="1"
          onChange={this.onChange}
          onEdit={this.onEdit}
          items={panes}
        ></Tabs>
        
        <ul ref={c => this.contextMenu = c} style={{display: show ? 'block' : 'none', left:left+'px',top:top+'px'}} className="contextmenu pa">
            <li className='ul_li' onClick={this.refreshSelectedTag}><i className="el-icon-refresh-right"></i> 刷新页面</li>
            <li className='ul_li' style={{display: this.isAffix() ? 'block' : 'none'}} onClick={this.closeSelectedTag}><i className="el-icon-close"></i> 关闭当前</li>
            <li className='ul_li' onClick={this.closeOthersTags}><i className="el-icon-circle-close"></i> 关闭其他</li>
            {/* <li className='ul_li' style={{display: this.isFirstView() ? 'block' : 'none'}} onClick={this.closeLeftTags}><i className="el-icon-back"></i> 关闭左侧</li>
            <li className='ul_li' style={{display: this.isLastView() ? 'block' : 'none'}} onClick={this.closeRightTags}><i className="el-icon-right"></i> 关闭右侧</li> */}
            <li className='ul_li' onClick={this.closeAllTags}><i className="el-icon-circle-close"></i> 全部关闭</li>
        </ul>
      </div>
    )
  }
}
export default connect(
  state => ({
    panes: state.tabsView,
    selectedKeys: state.selectedKeys,
  }),
  {
    updateTabsView
  }
)(withRouter(TabsView));