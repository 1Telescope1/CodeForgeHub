import CodeEditor from "@/components/CodeEditor";
import { RESULT_STATUS_INFO_MAP } from "@/core/sqlResult";
import { Card, Collapse, Table } from "antd";
import axios from "axios";
import React, { ReactNode, memo, useEffect, useState } from "react";
import { format } from "sql-formatter";
import { QueryExecResult } from "sql.js";

interface IProps {
  level: LevelType;
  result: QueryExecResult[];
  resultStatus: number;
  errorMsg?: string;
  children?: ReactNode;
}

const SqlResult: React.FC<IProps> = (IProps) => {
  const { level, result, resultStatus, errorMsg } = IProps;
    
  // 字段折叠面板展开的键
  const [activeKey, setActiveKey] = useState([]);
  const [resultType, setResultStatus] = useState("");
  const [columns, setColumns] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [initSql,setInitSql]=useState('')

  useEffect(()=>{
    axios.get(level.initSQL).then(res=>{
      setInitSql(res.data)
    })

  },[level])

  useEffect(() => {
    switch (resultStatus) {
      case -1:
        setResultStatus(RESULT_STATUS_INFO_MAP[-1]);
        break;
      case 0:
        setResultStatus(RESULT_STATUS_INFO_MAP[0]);
        break;
      case 1:
        setResultStatus(RESULT_STATUS_INFO_MAP[1]);
        break;
      default:
        break;
    }
  }, [resultStatus]);

  useEffect(() => {
    if (result.length) {      
      const columns = result[0].columns.map((column) => {
        return {
          title: column,
          dataIndex: column,
          key: column,
        };
      });
      setColumns(columns);

      const data = result[0].values.map((item,index) => {
        const rowData: Record<string, any> = {};
        item.forEach((val, index) => {
          const col = columns[index].title;
          rowData[col] = val;
        });
        rowData["key"] = index;
        return rowData;
      });
      setData(data);
    } 
  }, [result]);

  return (
    <div style={{ marginTop: 15 }}>
      <Collapse
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key as []);
        }}
      >
        <Collapse.Panel key={1} header="查看执行结果">
          <Card title="执行结果" extra={resultType}>
            {!errorMsg==true ? <Table style={{ overflowX: 'auto' }} columns={columns} dataSource={data}></Table> : '❌ 语句错误：{ errorMsg }'}
          </Card>
        </Collapse.Panel>
        <Collapse.Panel key={2} header="查看建表语句">
          <CodeEditor value={initSql} isReadOnly={true} language="sql" />
        </Collapse.Panel>
        <Collapse.Panel key={3} header="查看答案">
          {format(level.answer, { language: "sqlite" })}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default memo(SqlResult);
