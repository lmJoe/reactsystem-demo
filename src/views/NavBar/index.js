import { Avatar, Dropdown, Menu } from "antd";
import { Component } from "react";
import { removeToken } from "../../utils/auth";
import './index.css';
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <div onClick={()=>{
            window.location.reload();
          }}>刷新页面</div>
        ),
      },
      {
        key: '2',
        label: (
          <div onClick={()=>{
            removeToken()
            window.location.href = '/'
          }}>退出登录</div>
        ),
      },
    ]}

  />
);
export default class NavBar extends Component{
  render(){
    return(
      <div className="flex-row-start-center navbar">
        <Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>
        <Dropdown 
          overlay={menu} 
          placement="bottom" 
          arrow={{ pointAtCenter: true }}>
          <span>admin</span>
        </Dropdown>
      </div>
    )
  }
}
