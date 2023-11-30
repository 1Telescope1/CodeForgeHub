import React, { ReactNode, memo, useEffect, useState } from "react";
import { LearnWrapper } from "./style";
import { RadioChangeEvent, Radio, Row, Col, Card } from "antd";
import { useParams } from "react-router";
import { getLevelByKey } from "@/assets/levels";
import SqlProfile from "./components/SqlProfile";
import SqlEditor from "./components/SqlEditor";
import { QueryExecResult } from "sql.js";
import { checkResult } from "@/core/sqlResult";
import SqlResult from "./components/SqlResult";

interface IProps {
  children?: ReactNode;
}

const Learn: React.FC<IProps> = () => {
  const [layout, setLayout] = useState("half");

  // 更改布局
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  const [level, setLevel] = useState<any>();
  const { levelKey } = useParams();

  useEffect(() => {
    setLevel(getLevelByKey(levelKey as string));
  }, [levelKey]);

  // 处理运行逻辑
  const [result, setResult] = useState<QueryExecResult[]>([]);
  const [answerResult, setAnswerResult] = useState<QueryExecResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<any>();
  const [resultStatus, setResultStatus] = useState(-1);
  const onSubmit = (
    res: QueryExecResult[],
    answerRes: QueryExecResult[],
    errorMsg?: string
  ) => {
    setResult(res);
    setAnswerResult(answerRes);
    setErrorMsg(errorMsg);
    setResultStatus(checkResult(res, answerRes));
  };

  return (
    <LearnWrapper>
      <div className="top">
        <div className="left">练习SQL闯关</div>
        <div className="right">
          <span style={{ marginRight: "10px" }}>切换布局:</span>
          <Radio.Group onChange={onLayoutChange} value={layout}>
            <Radio.Button value="input">配置</Radio.Button>
            <Radio.Button value="half">同屏</Radio.Button>
            <Radio.Button value="output">结果</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div>
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 2 : 1}
          >
            {level && <SqlProfile level={level}></SqlProfile>}
          </Col>
          <Col
            xs={24}
            xl={layout === "half" ? 12 : 24}
            order={layout === "output" ? 1 : 2}
          >
            {level && (
              <Card title="请在此输入代码">
                <SqlEditor level={level} onSubmit={onSubmit}></SqlEditor>{" "}
                <SqlResult
                  level={level}
                  result={result}
                  resultStatus={resultStatus}
                  errorMsg={errorMsg}
                ></SqlResult>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </LearnWrapper>
  );
};

export default memo(Learn);
