import { Component } from "react";
import routes from '../index'
import RouterView from "../RouterView";

const routerList = [
  ...routes
]
export default class ViewRouter extends Component{
  render() {
    return (
      <div className="w100 h100">
        <RouterView routes={routerList} />
      </div>
    )
  }
}