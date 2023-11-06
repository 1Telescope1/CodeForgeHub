import React, { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 导入路由组件
const Home=lazy(()=>import('@/views/Home'))
const About=lazy(()=>import('@/views/About'))
const Contact=lazy(()=>import('@/views/Contact'))


 
const routes:RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/Contact',
    element: <Contact />,
  },
]
 
export default routes;
