import { FIELD_TYPE_LIST, ON_UPDATE_LIST } from "@/constant";
import { listMyDict } from "@/services/dict";
import { Form, message } from "antd";
import React, {
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState
} from "react";

interface IProps {
  ref: any;
  onSubmit: (values: TableSchema) => void;
  children?: ReactNode;
}

const FormInput: React.FC<IProps> = forwardRef((IProps, ref) => {
  const { onSubmit } = IProps;
  const [form] = Form.useForm();
  const [dictList, setDictList] = useState<DictType.Dict[]>([]);
  const [fieldInfoCreateModalVisible, setFieldInfoCreateModalVisible] =
    useState(false);
  const [tableInfoCreateModalVisible, setTableInfoCreateModalVisible] =
    useState(false);
  const [createFieldInfo, setCreateFieldInfo] =
    useState<FieldInfoType.FieldInfo>();
  const [createTableInfo, setCreateTableInfo] =
    useState<TableInfoType.TableInfo>();
  const [importFieldDrawerVisible, setImportFieldDrawerVisible] =
    useState(false);
  // 导入字段的位置
  const [importIndex, setImportIndex] = useState(0);
  // 字段折叠面板展开的键
  const [activeKey, setActiveKey] = useState([]);

  const onFinish = (values: any) => {
    if (!values.fieldList || values.fieldList.length < 1) {
      message.error("至少新增 1 个字段");
      return;
    }
    console.log("Received values of form:", values);
    onSubmit?.(values);
  };

  // 供父组件调用
  useImperativeHandle(ref, () => ({
    setFormValues: (tableSchema: TableSchema) => {
      // form.setFieldsValue(tableSchema);
      console.log(123);
    },
  }));

  // 获取可选词库列表
  const loadDictList = () => {
    listMyDict({})
      .then((res) => {
        setDictList(res.data);
      })
      .catch((e) => {
        message.error('加载词库失败，' + e.message);
      });
  };

  useEffect(() => {
    loadDictList();
  }, []);

  // 供父组件调用
  useImperativeHandle(ref, () => ({
    setFormValues: (tableSchema: TableSchema) => {
      form.setFieldsValue(tableSchema);
    },
  }));

  /**
   * 字段类型选项
   */
  const fieldTypeOptions = FIELD_TYPE_LIST.map((field) => {
    return {
      label: field,
      value: field,
    };
  });

  /**
   * 字段类型选项
   */
  const onUpdateOptions = ON_UPDATE_LIST.map((field) => {
    return {
      label: field,
      value: field,
    };
  });

  /**
   * AutoComplete 过滤函数
   * @param inputValue
   * @param option
   */
  const filterOption = (inputValue: string, option: any) =>
    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  return <div>FormInput</div>;
});

export default memo(FormInput);
