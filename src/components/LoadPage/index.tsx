import React, { ReactNode, memo } from "react";
import { LoadingWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const LoadPage: React.FC<IProps> = () => {
  return (
    <LoadingWrapper>
      <div className="container">
        <div className="tail"></div>
        <span className="z-1">Z</span>
        <span className="z-2">Z</span>
        <span className="z-3">Z</span>
        <div className="rabbit-body">
          <div className="face-container">
            <div className="rabbit-face">
              <div className="ear"></div>
              <div className="eye-l"></div>
              <div className="eye-r"></div>
              <div className="mouth"></div>
            </div>
          </div>
          <div className="leaf"></div>
          <div className="carrot"></div>
          <div className="hand-l"></div>
          <div className="hand-r"></div>
        </div>
        <div className="shadow"></div>
      </div>

      <div className="loader">
        <div> L </div>
        <div> O </div>
        <div> A </div>
        <div> D </div>
        <div> I </div>
        <div> N </div>
        <div> G </div>
        <div> </div>
        <div> </div>
        <div> </div>
      </div>
    </LoadingWrapper>
  );
};

export default memo(LoadPage);
