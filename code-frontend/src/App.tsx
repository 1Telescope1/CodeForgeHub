import React, { Suspense } from "react";
// 引入routes组件
import routes from "./router";
import "./App.css";
import { useRoutes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Suspense fallback={"loading..."}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
