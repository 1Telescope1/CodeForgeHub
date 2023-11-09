import React, { Suspense } from "react";
// 引入routes组件
import routes from "./router";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Suspense fallback={"loading..."}>
        <Header></Header>
        <div className="main">{useRoutes(routes)}</div>
        <Footer></Footer>
      </Suspense>
    </div>
  );
}

export default App;
