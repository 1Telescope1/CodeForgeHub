import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 导入路由组件
const Home=lazy(()=>import('@/views/Home'))
const About=lazy(()=>import('@/views/About'))

 
const routes:RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]
 
export default routes;
