import { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { getConfirmation } from "../../axios";
import RouterGuard from "../RouterGuard";
import MyLoading from "../../components/MyLoading";

export default class RouterView extends Component{
  /**
   * Suspense用于包裹懒加载进页面的组件，懒加载的组件再渲染时会出现延迟的问题，使用Suspense可优化交互
   * fallback 属性接受任何在组件加载过程中你想展示的 React 元素。如fallback={<div>Loading...</div>}
   * 
   * react-router-dom实现页面间的跳转
   *  <Switch>是唯一的因为它仅仅只会渲染一个路径。相比之下（不使用<Switch>包裹的情况下），每一个被location匹配到的<Route>将都会被渲染。
   */
  render() {
    let { routes } = this.props;
    return (
      <Suspense fallback={<MyLoading/>}>
        <Switch>
          {
            routes.map((item,index) => {
              return <Route key={index} path={item.path} exact={item.exact} render={(props)=>{
                 // 路由跳转取消上个组件所有的pending请求
                getConfirmation();
                return <RouterGuard {...item} {...props} />
              }}>
              </Route>
            })
          }
        </Switch>
      </Suspense>
    )
  }
}