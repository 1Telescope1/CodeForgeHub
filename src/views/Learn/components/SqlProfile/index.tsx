import React, { ReactNode, memo, useEffect, useState } from "react";
import axios from "axios";

import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";

interface IProps {
  level: LevelType;
  children?: ReactNode;
}

const SqlProfile: React.FC<IProps> = (IProps) => {
  const { level } = IProps;

  const [content, setContent] = useState("");
  const plugins = [gfm(), highlight()];

  useEffect(() => {
    axios.get(level.content).then((response) => {
      setContent(response.data);
    });
  }, [level]);

  return <Viewer value={content} plugins={plugins}></Viewer>;
};

export default memo(SqlProfile);
