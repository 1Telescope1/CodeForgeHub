import React, { ReactNode, memo } from "react";

interface IProps {
  children?: ReactNode;
}

const Dict: React.FC<IProps> = () => {
  return <div>Dict</div>;
};

export default memo(Dict);
