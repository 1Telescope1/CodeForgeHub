import React, { Suspense, useEffect, useState } from "react";
// 引入routes组件
import routes from "./router";
import "./App.css";
import { useLocation, useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const [isShowHeader,setIsShowHeader]=useState(true)

  useEffect(() => {
    // 当路由变化时，location 对象会被更新
    if(location.pathname=="/user/login"||location.pathname=="/user/register") {
      setIsShowHeader(false)
    } else {
      setIsShowHeader(true)
    }
  }, [location]);

  return (
    <div className="App">
      <Suspense fallback={"loading..."}>
        {isShowHeader && <Header></Header>}
        <div className="main">{useRoutes(routes)}</div>
        <Footer></Footer>
      </Suspense>
    </div>
  );
}

export default App;
