import React, { ReactNode, memo, useEffect, useState } from "react";
import axios from "axios";

import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css";
import { Button } from "antd";
import {
  allLevels,
  getCurrentLevelNum,
  getNextLevel,
  getPrevLevel,
} from "@/assets/levels";
import { useNavigate } from "react-router";
import { SqlProfileWrapper } from "./style";

interface IProps {
  level: LevelType;
  children?: ReactNode;
}

const SqlProfile: React.FC<IProps> = (IProps) => {
  const { level } = IProps;

  const [content, setContent] = useState("");
  const plugins = [gfm(), highlight()];
  const [levelNum, setLevelNum] = useState(1);

  useEffect(() => {
    axios.get(level.content).then((response) => {
      setContent(response.data);
    });
    setLevelNum(getCurrentLevelNum(level));
  }, [level]);

  const navigate = useNavigate();
  // 上一关
  const toPrevLevel = () => {
    const toLevel = getPrevLevel(level);
    if (toLevel) {
      navigate(`/learn/${toLevel.key}`);
    }
  };
  // 下一关
  const toNextLevel = () => {
    const toLevel = getNextLevel(level);
    if (toLevel) {
      navigate(`/learn/${toLevel.key}`);
    }
  };

  return (
    <SqlProfileWrapper>
      <Viewer value={content} plugins={plugins}></Viewer>
      <div className="space">
        <div>
          {levelNum > 0 && <Button onClick={toPrevLevel}>上一关</Button>}
        </div>
        <div>
          {levelNum < allLevels.length - 1 && (
            <Button onClick={toNextLevel}>下一关</Button>
          )}
        </div>
      </div>
    </SqlProfileWrapper>
  );
};

export default memo(SqlProfile);
