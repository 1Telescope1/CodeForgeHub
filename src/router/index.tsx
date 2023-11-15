import React, { lazy } from 'react'
import { RouteObject,Navigate } from 'react-router-dom'

// 导入路由组件
const Home=lazy(()=>import('@/views/Home'))
const Login=lazy(()=>import('@/views/User/Login'))
const Register=lazy(()=>import('@/views/User/Register'))
const Dict=lazy(()=>import('@/views/Dict'))
const TableInfo=lazy(()=>import('@/views/TableInfo'))
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
    path: '/user/login',
    element: <Login />,
  },
  {
    path: '/user/register',
    element: <Register />,
  },
  {
    path: '/Dict',
    element: <Dict />,
  },
  {
    path: '/tableInfo',
    element: <TableInfo />,
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
