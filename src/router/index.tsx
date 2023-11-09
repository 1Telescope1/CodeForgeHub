import React, { lazy } from 'react'
import { RouteObject,Navigate } from 'react-router-dom'

// 导入路由组件
const Home=lazy(()=>import('@/views/Home'))
const About=lazy(()=>import('@/views/About'))
const NotFound=lazy(()=>import('@/views/404'))

 
const routes:RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]
 
export default routes;
