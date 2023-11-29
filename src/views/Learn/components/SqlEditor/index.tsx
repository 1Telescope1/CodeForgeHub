import React, { ReactNode, memo, useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "@/components/CodeEditor";
import { Button, Card, Space, message } from "antd";
import { initDB, runSQL } from "@/core/sqlExecutor";
import { QueryExecResult } from "sql.js";

interface IProps {
  level: LevelType;
  onSubmit: (
    result: QueryExecResult[],
    answerResult: QueryExecResult[],
    errorMsg?: string
  ) => void;
  children?: ReactNode;
}

const SqlEditor: React.FC<IProps> = (IProps) => {
  const { level, onSubmit } = IProps;
  const [initSql, setInitSql] = useState();
  const [sqlValue, setSqlValue] = useState(
    "-- 请在此处输入 SQL\n" + level.defaultSQL
  );
  const [db, setDb] = useState<any>();

  useEffect(() => {
    const initDabase = async () => {
      const res = await axios.get(level.initSQL);
      setInitSql(res.data);
      setDb(await initDB(res.data));
    };
    initDabase();
  }, []);

  const doSubmit = () => {
    if (!sqlValue) return;
    try {
      const result = runSQL(db, sqlValue);
      const answerResult = runSQL(db, level.answer);
      onSubmit(result, answerResult);
    } catch (error) {
      message.error("语句错误，" + error);
      onSubmit([], [], error as string);
    }
  };

  return (
    <div>
      <Card title="请在此输入代码">
        <CodeEditor value={sqlValue} onChange={setSqlValue} language="sql" />
        <Space style={{ marginTop: 20 }}>
          <Button type="primary" style={{ width: 180 }} onClick={doSubmit}>
            运行
          </Button>
          <Button>格式化</Button>
          <Button>重置</Button>
        </Space>
      </Card>
    </div>
  );
};

export default memo(SqlEditor);
