import { Component } from "react";
import { getOpenKeysForId } from "../utils/menu";

class ViewMenu extends Component{
  componentDidMount(){
    //路由监听
    this.routerListen()
  }
  routerListen = () => {
    console.log("路由监听")
    this.pubsubToken = React.$PubSub.subscribe('routeChange', (_, path)=>{
      // 跳转重定向，不进行选项卡存储
      if(path == '/redirect') return
      const openKeys = getOpenKeysForId(path)
      const keyPath = [...openKeys, path]
      // this.undateMenuCommon(openKeys, keyPath.reverse())
  })
  }
} 

export default ViewMenu;