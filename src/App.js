// import logo from './logo.svg';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter } from "react-router-dom";
import ViewRouter from './router/ViewRouter';
/**
 * BrowserRouter将会监听Url变化，当URL变更时，它将使浏览器显示相应的页面
   BrowserRouter本身是一个类组件，还是一个高阶组件，在内部创建一个全局history对象（可以监听整个路由的变化），
   并将history作为props传递给react-router的Router的组件（Router组件再会将这个history的属性作为context传递给子组件）
 */
function App () {
  return (
    <BrowserRouter>
      <ViewRouter></ViewRouter>
    </BrowserRouter>
  );
}
 
export default App;