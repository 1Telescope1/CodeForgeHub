import React, { ReactNode, memo } from "react";
import { NotFoundWrapper } from "./style";
import { Link } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const NotFound: React.FC<IProps> = () => {
  const message = "您不能进入那个页面...";

  return (
    <NotFoundWrapper>
      <div className="wscn-http404">
        <div className="pic-404">
          <img
            className="pic-404__parent"
            src={require("@/assets/404_images/404.png")}
            alt="404"
          />
          <img
            className="pic-404__child left"
            src={require("@/assets/404_images/404_cloud.png")}
            alt="404"
          />
          <img
            className="pic-404__child mid"
            src={require("@/assets/404_images/404_cloud.png")}
            alt="404"
          />
          <img
            className="pic-404__child right"
            src={require("@/assets/404_images/404_cloud.png")}
            alt="404"
          />
        </div>
        <div className="bullshit">
          <div className="bullshit__oops">OOPS!</div>
          <div className="bullshit__headline">{message}</div>
          <div className="bullshit__info">
            请检查您输入的URL是否正确，或者确认您是否有权限进入那个页面。
          </div>
          <Link to="/" className="bullshit__return-home">
            返回首页
          </Link>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default memo(NotFound);
