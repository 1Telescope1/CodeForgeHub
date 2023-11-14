import { Drawer } from "antd";
import React, {
  ReactNode,
  forwardRef,
  memo,
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
