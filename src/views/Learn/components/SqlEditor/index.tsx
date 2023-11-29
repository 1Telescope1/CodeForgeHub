import React, { ReactNode, memo, useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "@/components/CodeEditor";
import { Button, Space, message } from "antd";
import { initDB, runSQL } from "@/core/sqlExecutor";
import { QueryExecResult } from "sql.js";
import { format } from "sql-formatter";

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
  const defaultSql = "-- 请在此处输入 SQL\n" + level.defaultSQL;
  const [sqlValue, setSqlValue] = useState(defaultSql);
  const [db, setDb] = useState<any>();

  useEffect(() => {
    const initDabase = async () => {
      const res = await axios.get(level.initSQL);
      setDb(await initDB(res.data));
    };
    initDabase();
  }, []);

  // 提交
  const doSubmit = () => {
    if (!sqlValue) return;
    try {
      const result = runSQL(db, sqlValue);
      const answerResult = runSQL(db, level.answer);
      onSubmit(result, answerResult);
      message.success("运行成功");
    } catch (error:any) {
      message.error("语句错误，" + error.message);
      onSubmit([], [], error.message as string);
    }
  };

  // 格式化
  const doFormat = () => {
    if (!sqlValue) return;
    const result = format(sqlValue, { language: "sqlite" });
    setSqlValue(result);
  };

  // 重置
  const resetSqlValue = () => {
    setSqlValue(defaultSql);
  };

  return (
    <div>
      <CodeEditor height={250} value={sqlValue} onChange={setSqlValue} language="sql" />
      <Space style={{ marginTop: 20 }}>
        <Button type="primary" style={{ width: 180 }} onClick={doSubmit}>
          运行
        </Button>
        <Button onClick={doFormat}>格式化</Button>
        <Button onClick={resetSqlValue}>重置</Button>
      </Space>
    </div>
  );
};

export default memo(SqlEditor);
