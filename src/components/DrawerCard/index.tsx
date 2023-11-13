import { getInitialState } from "@/utils/access";
import React, { ReactNode, memo, useEffect, useState } from "react";

interface IProps {
  title: string;
  needLogin?: boolean;
  showTag?: boolean;
  onLoad?: (
    searchParams:
      | FieldInfoType.FieldInfoQueryRequest
      | TableInfoType.TableInfoQueryRequest,
    setDataList: (
      dataList: FieldInfoType.FieldInfo[] | TableInfoType.TableInfo[]
    ) => void,
    setTotal: (total: number) => void
  ) => void;
  onImport?: (
    values: FieldInfoType.FieldInfo | TableInfoType.TableInfo
  ) => void;
  children?: ReactNode;
}

const DrawerCard: React.FC<IProps> = (IProps) => {
  const { title, needLogin = false, showTag = true, onLoad, onImport } = IProps;

  useEffect(() => {
    // const fetchData = async () => {      
    //   try {
    //     const initialState = await getInitialState();
    //     const loginUser = initialState?.loginUser;
    //   } catch (error) {}
    // };

    // fetchData()
    // console.log(123);
    console.log(123);
    
    
  });

  return <div>{title}</div>;
};

export default memo(DrawerCard);
