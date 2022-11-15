import {lazy} from 'react'
let router = [
    {
        path: "/login",
        component: lazy(()=>import('@/views/Login')),
        redirect: true,// 默认打开登录页
        exact: true //是否为严格匹配
    },
    {
        path: '/',
        component: lazy(()=>import('@/views/MyView')),
        exact: false,
        routes: [  /** 嵌套路由 */
            {
              path: '/appSurvey',
              component: lazy(()=>import('@/pages/app/AppSurvey')),
              exact: false
            },
            {
              path: '/webSurvey',
              component: lazy(()=>import('@/pages/web/WebSurvey')),
              exact: false
            },
            {
              path: '/redirect',
              component: lazy(()=>import('@/pages/Redirect')),
              exact: false
            },
            {
              path: '*',
              component: lazy(()=>import('@/components/MyNotFound')),
              meta: {
                  title: '404'
              }
            },
        ]
    },
];

export default router;