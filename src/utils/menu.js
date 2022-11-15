export const menuJson = [
  {
    id:'1',
    name:'APP',
    path:'/',
    children:[
      {
        id: "/appSurvey",
        name: "概况",
        path: "/appSurvey",
        children: [],
      },{
        id: "/appRetain",
        name: "留存分析",
        path: "/appRetain",
        children: [],
      },{
        id: "/appDuration",
        name: "时长分析",
        path: "/appDuration",
        children: [],
      },{
        id: "/appWithdraw",
        name: "提现审核",
        path: "/appWithdraw",
        children: [],
      },{
        id: "/appGold",
        name: "金币支出",
        path: "/appGold",
        children: [],
      },{
        id: "/appPlayData",
        name: "播放数据",
        path: "/appPlayData",
        children: [],
      },{
        id: "/appCustom",
        name: "自定义事件",
        path: "/appCustom",
        children: [],
      },{
        id: "/customQuery",
        name: "自定义查询",
        path: "/customQuery",
        children: [],
      }
    ]
  },{
    id:'2',
    name:'网站',
    path:'/',
    children:[
      {
        id: "/webSurvey",
        name: "网站概况",
        path: "/webSurvey",
        children: [],
      },
      {
        id: "/webPlayData",
        name: "网站播放数据",
        path: "/webPlayData",
        children: [],
      },
    ],
  },{
    id:'3',
    name:'斑点狗',
    path:'/',
    children:[
      {
        id: "/bdgUseraction",
        name: "用户行为数据",
        path: "/bdgUseraction",
        children: [],
      },
      {
        id: "/bdgSurvey",
        name: "概况",
        path: "/bdgSurvey",
        children: [],
      },{
        id: "/bdgRetain",
        name: "留存分析",
        path: "/bdgRetain",
        children: [],
      },{
        id: "/bdgDuration",
        name: "时长分析",
        path: "/bdgDuration",
        children: [],
      },{
        id: "/bdgPlayData",
        name: "播放数据",
        path: "/bdgPlayData",
        children: [],
      },
    ],
  },{
    id:'4',
    name:'魔盒联盟H5',
    path:'/',
    children:[
      {
        id: "/moheboxFlow",
        name: "总体流量分析",
        path: "/moheboxFlow",
        children: [],
      },{
        id: "/mohDMeedia",
        name: "分媒体数据",
        path: "/mohDMeedia",
        children: [],
      },{
        id: "/mohePlayData",
        name: "播放数据",
        path: "/mohePlayData",
        children: [],
      },
    ],
  },{
    id:'5',
    name:'魔盒SDK',
    path:'/',
    children:[
      {
        id: "/sdksurvey",
        name: "留存分析",
        path: "/sdksurvey",
        children: [],
      },{
        id: "/sdkDuration",
        name: "时长分析",
        path: "/sdkDuration",
        children: [],
      },{
        id: "/sdkPlayData",
        name: "播放数据",
        path: "/sdkPlayData",
        children: [],
      },
    ],
  },{
    id:'6',
    name:'小程序',
    path:'/',
    children:[
      {
        id: "/xcxsurvey",
        name: "概况",
        path: "/xcxsurvey",
        children: [],
      },{
        id: "/xcxPlayData",
        name: "播放数据",
        path: "/xcxPlayData",
        children: [],
      },{
        id: "/xcxHotData",
        name: "热榜数据",
        path: "/xcxHotData",
        children: [],
      },
    ],
  },{
    id:'7',
    name:'视频分发',
    path:'/',
    children:[
      {
        id: "/videoData",
        name: "视频数据查询",
        path: "/videoData",
        children: [],
      },{
        id: "/videoDistrRopret",
        name: "视频发布报表",
        path: "/videoDistrRopret",
        children: [],
      }
    ],
  },{
    id:'8',
    name:'元数据查询',
    path:'/',
    children:[
      {
        id: "/SelectModel",
        name: "控制台",
        path: "/SelectModel",
        children: [],
      }
    ],
  },{
    id:'9',
    name:'经营报表',
    path:'/',
    children:[
      {
        id: "/operStatementEC",
        name: "电商经营报表",
        path: "/operStatementEC",
        children: [],
      },
      {
        id: "/operStatement",
        name: "经营数据报表",
        path: "/operStatement",
        children: [],
      },{
        id: "/dataEntryAdv",
        name: "数据录入-广告部",
        path: "/dataEntryAdv",
        children: [],
      },{
        id: "/dataEntryVideo",
        name: "数据录入-视频分发",
        path: "/dataEntryVideo",
        children: [],
      },{
        id: "/dataEntryFinance",
        name: "数据录入-财务",
        path: "/dataEntryFinance",
        children: [],
      },{
        id: "/dataEntryIDC",
        name: "数据录入-数据中心",
        path: "/dataEntryIDC",
        children: [],
      },{
        id: "/dataEntryBlog",
        name: "更新日志",
        path: "/dataEntryBlog",
        children: [],
      }
    ],
  },{
    id:'/versionUpdating',
    name:'版本更新说明',
    path:'/versionUpdating',
    children:[],
  },{
    id:'/operRecord',
    name:'操作日志',
    path:'/operRecord',
    children:[],
  }
]
//返回菜单第一层级id,用于antd展开
export const getMenuFirstLevelId = () =>{
  let arr = [];
  menuJson.forEach(element => {
    arr.push(element.id)
  });
  return arr;
}
// 递归获取第一项
const OpenFisrt = initOpenFisrt()

// 默认展开项
export const initOpenKeys = OpenFisrt.OpenKeys

// 默认选中项
export const initSelectedKeys = OpenFisrt.SelectedKeys

// 默认显示面包屑
export const initBreadcrumb = OpenFisrt.Breadcrumb

// 默认显示选项卡
export const initTabs = OpenFisrt.Tabs

// 登录进入首页或路由地址为'/',默认打开菜单第一项
function initOpenFisrt() {
  let OpenKeys = [],
      SelectedKeys = [],
      Breadcrumb = []
  recursionGetFisrt(menuJson[0], OpenKeys, SelectedKeys, Breadcrumb)
  return {
    OpenKeys,
    SelectedKeys,
    Breadcrumb,
    Tabs: [{
      label: Breadcrumb[Breadcrumb.length-1],
      key: SelectedKeys[0],
      closable: false,
      openKeys: OpenKeys,
      selectedKeys: SelectedKeys,
      breadcrumb: Breadcrumb
    }]
  }
}
function recursionGetFisrt (data, OpenKeys, SelectedKeys, Breadcrumb) {
    let children = data.children
    Breadcrumb.push(data.name)
    if(children && children.length && children.length > 0){
      OpenKeys.push(data.id)
      recursionGetFisrt(children[0], OpenKeys, SelectedKeys, Breadcrumb)
    }else{
      SelectedKeys.push(data.id)
    }
}


// 用于监听浏览器前进后退，根据id获取当前展开项
export const getOpenKeysForId = (id) => {
  return recursionData(menuJson, id).arr
}
// 递归数据
const recursionData = (data, id) => {
  let arr = [], isFind = false
  for(var i in data){
    let cld = data[i].children
    arr = []
    if(cld.length && cld.length > 0){
      arr.push(data[i].id)
      let o = recursionData(cld, id)
      arr = [...arr, ...o.arr]
      if(o.isFind) return {isFind: o.isFind, arr}
    }else{
      if(data[i].path == id){
        isFind = true
        break
      }
    }
  }
  return {isFind, arr}
}

// 更新面包屑显示文字
export const getKeyPathTitle = (keyPath) => {
  let title = [];
  keyPath.forEach(item => {
      let str = returnName(menuJson, item)
      // 如果没有找到，则显示404
      title.push(str || '404')
  })
  // 返回菜单名称
  return title
}

// 递归查询每一层级的name值
const returnName = (data, value)=>{
  let name = ''
  for(var i in data){
      if(data[i].id == value){
          name = data[i].name
      }
      if(!name && data[i].children.length > 0){
          name = returnName(data[i].children, value)
      }
      if(name) {
          break
      }
  }
  return name
}