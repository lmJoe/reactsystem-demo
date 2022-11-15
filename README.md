### `npm start`
运行命令

### `npm run build`
打包命令

### `npm run eject`
暴露配置文件命令

### `nanoid`
import {nanoid} from 'nanoid'
生成全球唯一ID
nanoid()

### `propTypes`
import PropTypes from 'prop-types'
对接收的props进行类型、必要性判断
static propTpye = {
    params: PropTypes.array.isRequired,
    params: PropTypes.func.isRequired,
    params: PropTypes.string.isRequired,
    params: PropTypes.boolen.isRequired,
}

### `es6 数组`
数组的合并
let obj = {a:1,b:2}
let arr = []
let arr1 = []
[...arr, ...arr1] [...arr1, ...arr]

<!-- reduce(pre,current) 对数组进行处理  pre上次返回值  current当前处理值 -->

添加
[obj, ...arr] [...arr, obj]

### `es6 对象`
let obj = {a:1,b:2}

获取
let {a, b} = obj
修改某一个属性
{obj, a: 2}

解构赋值的连续写法
let obj1 = {
    aa: {
        bb: '1'
    },
    cc: '2
}
let {aa:{bb}} = obj1
let {aa:{bb:newName}} = obj1 拿到bb并将bb重命名

### `消息订阅 与发布 任意组件之间的通信`
npm install pubsub-js
引入 Pubsub from 'pubsub-js'

发布消息：Pubsub.publish('funName',{a: 1})
接收消息(订阅消息)：const token = Pubsub.subscribe('funcName', (_, data)=>{
    console.log(data)
})
取消订阅：Pubsub.unsubscribe(token)

### `请求方式：xhr、fetch`
xhr: jQuery axios
fetch：原生请求方法 不需要引入 可直接使用 (关注分离的涉及思想)
try{
    const res = await fetch('/login') //判断是否可以与服务器建立链接
    const data = await res.json()  // 建立链接后获取数据
    console.log(data)
} catch(err) {
    console.log('请求出错', err)
}

### `路由`
<!-- Link -->
<Link className='ddd' to='/login'>login</Link>

<!--NavLink activeClassName 路由选中class名 -->
<NavLink activeClassName='active' className='ddd' to='/login'>login</NavLink>  

<!-- Route exact:精准匹配 m默认模糊匹配 -->
<Route exact path="/demo components={Demo}"/>

<!-- Switch 单一匹配route 提高效率-->
<Switch><Route /></Switch>

<!-- redirect 重定向 -->
<Redirect to="/demo">
<!-- 路由传参 -->

<!-- params参数 -->
<!-- 像路由组件传递params参数 -->
<Link to="/demo/1/title"></Link>
<!-- 声明接收params参数 -->
<Route path="/demo/:id/:title" />
<!-- 接收参数 -->
const {id, title} = this.props.match.params

<!-- search参数 -->
<Link to="/demo/?id=1&title=title"></Link>
<!-- 无需声明接收search参数 -->
<Route path="/demo" />
<!-- 接收参数 -->
<!-- 获取到的search是urlencoded编码字符串，需要借助querystring解析 -->
<!-- 格式化serach参数： -->
<!-- 引入querystring import qs from 'querystring'-->
const {id, title} = qs.parse(this.props.location.search.slice(1))

<!-- state参数 地址栏不显示传递的参数 -->
<Link to={{pathname: '/dome', state:{id: 01, title: 'title'}}}>
<!-- 无需声明接收search参数 -->
<Route path="/demo" />
<!-- 接收参数 -->
const {id, title} = this.props.location.state || {}

<!-- 编程式路由 push/replace-->
this.props.history.push(`/dome/${id}/$(title)`)
this.props.history.push(`/dome?id=${id}&title=$(title)`)
this.props.history.push(`/dome`, {id: id, title: title})
this.props.history.goBack() // 回退一步
this.props.history.goForward() // 前进一步
this.props.history.go(1) // 参数为正 前进n步  为负后退n步

<!-- withRouter: 解决一般组件使用路由组件api 跳转/回退 -->
import {withRouter} from 'react-router-dom'
export default withRouter(<Demo/>)

<!-- BrowserRouter 'HashRouter的区别 -->
1.底层原理不一样:
    BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。HashRouter使用的是URL的哈希值。
2.path表现形式不一样
    BrowserRouter的路径中没有#,例如: localhost:3000/demo/test
    HashRouter的路径包含#,例如: localhost:3000/#/demo/test
3.刷新后对路由state参数的影响
    (1).BrowserRouter没有任何影响，因为state保存在history对象中。
    (2).HashRouter刷新后会导致路由state参数的丢失!! !l
4.备注: HashRouter可以用于解决一些路径错误相关的问题。

### `redux`
redux开发者工具：Redux DevTools

### `serve`
npm i serve -g 全局安全serve 可以在本地启动一个服务器 将打包后的文件进行打开

### `扩展`
    1.  setState()两种写法
        1) 对象写法
            setState({name: 'aa'}, ()=>{
                // 同步调用方法 异步更新视图
                console.log(this.state.name)
            })
        2) 函数写法
            setState((state, props)=> {
                return {name: 'aa'}
            })
    2.  lazyLoad(懒加载)
        导入 import React, {Component,lazy, Suspense} from 'rearct'
             import Loading from './Loading'
        使用 const Home = lazy(()=>{import('./Home')})
        注意 注册路由需要用Suspense包裹 fallback: 在未加载出组件时，指定一个中间组件进行显示
        <Suspense fallback="<Loading>">
            <Route  path='/home' compontent={Home}/>
        </Suspense>
    3.  Hooks
            (1). Hook是React 16.8.0版本增加的新特性/新语法
            (2)．可以让你在函数组件中使用state以及其他的 React特性
        1.三个常用的Hook
            (1). state Hook: React.useState()
            (2). Effect Hook: React.useEffect()
            (3). Ref Hook: React.useRef()
        2.State Hook
            (1). state Hook让函数组件也可以有state状态，并进行状态数据的读写操作
            (2)．语法:const [xxx，setXxx] = React.useState(initvalue)
            (3). useState()说明:
                参数:第一次初始化指定的值在内部作缓存
                返回值:包含2个元素的数组，第1个为内部当前状态值，第2个为更新状态值的函数
            (4). setXxx()2种写法:
                setXxx(newvalue):参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
                setxxx(value => newValue):参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
        3.Rffect Hook
            (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
            (2). React中的副作用操作:
                 发ajax请求数据获取
                 设置订阅/启动定时器
                 手动更改真实DOM
            (3). 语法和说明:
                useEffect(
                    ()=> {
                        //在此可以执行任何带副作用操作
                        return () => { //在组件卸载前执行
                            //在此做一些收尾工作，比如清除定时器/取消订阅等
                        },
                    },
                    [statevalue]//如果指定的是[]，回调函数只会在第一次render()后执行
                )
            (4). 可以把useEffect Hook看做如下三个函数的组合
                componentDidMount()
                componentDidUpdate()
                componentwillUnmount()
        4.Ref Hook
            (1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
            (2)．语法: const refContainer = React.useRef()
            (3)．作用:保存标签对象,功能与React.createRef()一样
    3.Fragment
        <Fragment></Fragment> 空标签 渲染时会被干掉 只接受一个参数key
        <></>                 空标签 渲染时会被干掉 不接收任何参数
    4.Context 
        用于祖组件与后代组件之间的通信
        1)创建context容器对象:
            const XxxContext = React.createcontext()
        2）渲染子组时，外面包裹xxxcontext.Provider，通过value属性给后代组件传递数据:
            <XXXContext.Provider value={数据}>
                子组件
            </xxxContext.Provider>
        3)后代组件读取数据:
            //第一种方式:仅适用于类组件
                static contextType = xxxContext //声明接收
                this.context // 读取context中的value数据
            //第二种方式:函数组件与类组件都可以
            <xxxContext.Consumer>
                {
                    (
                        value => { // value就是context中的value数据要显示的内容
                            return `这是返回内容`
                        } 
                    )
                }
            </×xxContext.Consumer>
    5.组件优化
        办法1:
            重写shouldcomponentUpdate()方法
            比较新旧state或props数据，如果有变化才返回true，如果没有返回false
        办法2:
            使用PureComponent
                PureComponent重写了shou1dComponentUpdate()，只有state或props数据有变化才返回true
            注意:
                只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回fa1se
                不要直接修改state数据,而是要产生新数据
                项目中一般使用PureComponent来优化
    6.render props
        如何向组件内部动态传入带内容的结构(标签)?
        vue中:
            使用s1ot技术，也就是通过组件标签体传入结构 <A><B/></A>
        React中:
            使用children props:通过组件标签体传入结构
            使用render props:通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性
        children props
            <A>
                <B>XXXX</B>
            </A>
            {this.props.chi1dren}
            问题:如果B组件需要A组件内的数据，==>做不到
        render props
            <A render={
                (data) => <C data={data}></C>
            }>
            </A>
            A组件:向C组件传递数据 {this.props.render(内部state数据)}
            c组件:读取A组件传入的数据显示 {this.props.data}
    7.错误边界
        理解:
            错误边界(Error boundary):用来捕获后代组件错误，渲染出备用页面
        特点:
            只能捕获后代组件[ 生命周期 ]产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
        使用方式:
            getDerivedStateFromError 配合 componentDidCatch
            //生命周期函数，一旦后台组件报错,就会触发
            static getDerivedstateFromError (error) {
                console.log(error );
                //在render之前触发
                //返回新的state
                return {
                    hasError : true,
                }
            }

            componentDidCatch(error,info) {
                //统计页面的错误。发送请求发送到后台去console.log(error , info);
            }
    8.组件通信方式总结
        组件间的关系:
            ·父子组件
            ·兄弟组件(非嵌套组件)
            ·祖孙组件(跨级组件)
        几种通信方式:
            1.props :
                (1).children props
                (2).render props
            2.消息订阅-发布:
                pubs-sub、 event等等
            3.集中式管理:
                redux、dva等等
            4.conText:
                生产者-消费者模式
        比较好的搭配方式:
            父子组件:props
            兄弟组件:消息订阅-发布、集中式管理
            祖孙组件(跨级组件)∶消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)