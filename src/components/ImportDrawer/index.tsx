import { listMyTableInfoByPage } from "@/services/tableInfo";
import { getInitialState } from "@/utils/access";
import { Drawer, message } from "antd";
import React, {
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface IProps {
  ref: any;
  visible: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

const ImportDrawer: React.FC<IProps> = forwardRef((IProps, ref) => {
  const { visible, onClose, children, title } = IProps;
  const [loadMyData, setLoadMyData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialState = await getInitialState();
        const loginUser = initialState?.loginUser;
        let flag = loginUser
          ? (
              searchParams: TableInfoType.TableInfoQueryRequest,
              setDataList: (dataList: TableInfoType.TableInfo[]) => void,
              setTotal: (total: number) => void
            ) => {
              listMyTableInfoByPage(searchParams)
                .then((res) => {
                  console.log(res);

                  setDataList(res.data.records);
                  setTotal(res.data.total);
                })
                .catch((e) => {
                  message.error("加载失败，" + e.message);
                });
            }
          : undefined;
        setLoadMyData(flag);
        // 在这里可以使用 loginUser 进行其他操作
      } catch (error) {
        console.error("Error fetching initial state:", error);
      }
    };
    fetchData();
  }, []);

  // 使用 useImperativeHandle 将方法传递给父组件
  useImperativeHandle(ref, () => ({
    loadMyData: loadMyData,
  }));

  return (
    <Drawer
      title={title}
      contentWrapperStyle={{ width: "60%", minWidth: 320 }}
      open={visible}
      onClose={onClose}
      maskClosable={false}
    >
      {children}
    </Drawer>
  );
});

export default memo(ImportDrawer);
