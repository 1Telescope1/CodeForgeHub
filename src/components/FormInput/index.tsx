import {
  COMMON_FIELD_LIST,
  DEFAULT_ADD_FIELD,
  FIELD_TYPE_LIST,
  MOCK_PARAMS_RANDOM_TYPE_LIST,
  MOCK_TYPE_LIST,
  ON_UPDATE_LIST,
} from "@/constant";
import { listMyDict } from "@/services/dict";
import {
  AutoComplete,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from "antd";
import React, {
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormInputWrapper } from "./style";
import { UpOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CreateModal from "../CreateModal";
import useCreateModal from "@/hooks/useCreateModal";
import ImportDrawer from "../ImportDrawer";
import DrawerCard from "../DrawerCard";
import InfoCard from "../InfoCard";

const { Option } = Select;

interface IProps {
  ref: any;
  onSubmit: (values: TableSchema) => void;
  children?: ReactNode;
}

const FormInput: React.FC<IProps> = forwardRef((IProps, ref) => {
  const { onSubmit } = IProps;
  const [form] = Form.useForm();
  const [dictList, setDictList] = useState<DictType.Dict[]>([]);
  const [importFieldDrawerVisible, setImportFieldDrawerVisible] =
    useState(false);

  // CreateModal参数
  const {
    modalParams,
    setModalParams,
    CreateModalVisible,
    setCreateModalVisible,
    FieldInfoCreateModal,
    TableInfoCreateModal,
    initialValues,
    setInitialValues,
  } = useCreateModal();

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
      form.setFieldsValue(tableSchema);
    },
  }));

  // 获取可选词库列表
  const loadDictList = () => {
    listMyDict({})
      .then((res) => {
        setDictList(res.data);
      })
      .catch((e) => {
        message.error("加载词库失败，" + e.message);
      });
  };

  // 保存字段
  const saveField = (e: any, index: number) => {
    const fieldInfo = form.getFieldsValue().fieldList[index];
    setInitialValues({
      name: fieldInfo.comment,
      content: JSON.stringify(fieldInfo),
    } as FieldInfoType.FieldInfo);
    setModalParams(FieldInfoCreateModal);
    setCreateModalVisible(true);
    e.stopPropagation();
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

  return (
    <>
      <FormInputWrapper>
        <Form<TableSchema>
          className="form-input"
          form={form}
          scrollToFirstError
          onFinish={onFinish}
          onReset={() => {
            form.resetFields(["fieldList"]);
          }}
        >
          <Form.Item name="dbName" label="库名">
            <Input placeholder="多个单词间建议用下划线分割" />
          </Form.Item>
          <Form.Item
            name="tableName"
            label="表名"
            initialValue="test_table"
            rules={[{ required: true }]}
          >
            <Input placeholder="多个单词间建议用下划线分割" />
          </Form.Item>
          <Form.Item name="tableComment" label="表注释">
            <Input placeholder="描述表的中文名称、作用等" />
          </Form.Item>
          <Form.Item
            label="生成条数"
            name="mockNum"
            initialValue={20}
            rules={[{ required: true }]}
          >
            <InputNumber min={10} max={100} />
          </Form.Item>
          <Form.List name="fieldList">
            {(fields, { add, remove, move }) => (
              <>
                <Collapse
                  activeKey={activeKey}
                  onChange={(key) => {
                    setActiveKey(key as []);
                  }}
                >
                  {fields.map((field, index) => (
                    <Collapse.Panel
                      key={field.key}
                      header={
                        <Form.Item
                          style={{ maxWidth: 320, marginBottom: 0 }}
                          label="字段名"
                          name={[field.name, "fieldName"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="建议用纯英文" />
                        </Form.Item>
                      }
                      extra={
                        <Space className="field-toolbar">
                          {index > 0 && (
                            <Button
                              type="text"
                              onClick={(e) => {
                                move(index, index - 1);
                                e.stopPropagation();
                              }}
                              icon={<UpOutlined />}
                            ></Button>
                          )}
                          {index < fields.length - 1 && (
                            <Button
                              type="text"
                              onClick={(e) => {
                                move(index, index + 1);
                                e.stopPropagation();
                              }}
                              icon={<DownOutlined />}
                            ></Button>
                          )}
                          <Button
                            type="text"
                            onClick={(e) => saveField(e, index)}
                          >
                            保存
                          </Button>
                          <Button
                            type="text"
                            danger
                            onClick={(e) => {
                              remove(field.name);
                              e.stopPropagation();
                            }}
                          >
                            删除
                          </Button>
                        </Space>
                      }
                    >
                      <Space
                        key={field.key}
                        align="baseline"
                        wrap
                        size={[24, 0]}
                      >
                        <Form.Item
                          label="字段类型"
                          name={[field.name, "fieldType"]}
                          rules={[{ required: true }]}
                        >
                          <AutoComplete
                            style={{ width: 120 }}
                            placeholder="请输入"
                            options={fieldTypeOptions}
                            filterOption={filterOption}
                          />
                        </Form.Item>
                        <Form.Item
                          label="字段类型"
                          name={[field.name, "defaultValue"]}
                        >
                          <Input placeholder="要和字段类型匹配" />
                        </Form.Item>
                        <Form.Item label="注释" name={[field.name, "comment"]}>
                          <Input placeholder="描述中文名称、作用等" />
                        </Form.Item>
                        <Form.Item
                          label="onUpdate"
                          name={[field.name, "onUpdate"]}
                        >
                          <AutoComplete
                            style={{ width: 180 }}
                            placeholder="字段更新动作"
                            options={onUpdateOptions}
                            filterOption={filterOption}
                          />
                        </Form.Item>
                        <Form.Item
                          label="非空"
                          name={[field.name, "notNull"]}
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                        <Form.Item
                          label="主键"
                          name={[field.name, "primaryKey"]}
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                        <Form.Item
                          label="自增"
                          name={[field.name, "autoIncrement"]}
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                        <Form.Item
                          label="模拟类型"
                          name={[field.name, "mockType"]}
                          initialValue="固定"
                        >
                          <Select
                            style={{ width: 120 }}
                            options={MOCK_TYPE_LIST}
                            onChange={() => {
                              form.setFieldValue(
                                ["fieldList", index, "mockParams"],
                                ""
                              );
                            }}
                          ></Select>
                        </Form.Item>
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) => {
                            return (
                              prevValues.fieldList[index]?.mockType !==
                              curValues.fieldList[index]?.mockType
                            );
                          }}
                        >
                          {(value) => {
                            const mockType =
                              value.getFieldsValue().fieldList[index].mockType;
                            switch (mockType) {
                              case "固定":
                                return (
                                  <Form.Item
                                    label="固定值"
                                    name={[field.name, "mockParams"]}
                                  >
                                    <Input placeholder="请输入固定值" />
                                  </Form.Item>
                                );
                              case "随机":
                                return (
                                  <Form.Item
                                    label="随机规则"
                                    name={[field.name, "mockParams"]}
                                  >
                                    <Select
                                      style={{ width: 120 }}
                                      options={MOCK_PARAMS_RANDOM_TYPE_LIST}
                                    ></Select>
                                  </Form.Item>
                                );
                              case "规则":
                                return (
                                  <Form.Item
                                    label="规则"
                                    name={[field.name, "mockParams"]}
                                    rules={[{ required: true }]}
                                  >
                                    <Input placeholder="请输入正则表达式" />
                                  </Form.Item>
                                );
                              case "递增":
                                return (
                                  <Form.Item
                                    label="起始值"
                                    name={[field.name, "mockParams"]}
                                    rules={[{ required: true }]}
                                  >
                                    <InputNumber />
                                  </Form.Item>
                                );
                              case "词库":
                                return (
                                  <Form.Item
                                    label="词库"
                                    name={[field.name, "mockParams"]}
                                  >
                                    <Select
                                      style={{ width: 150 }}
                                      showSearch
                                      dropdownRender={(menu) => (
                                        <>
                                          {menu}
                                          <Divider
                                            style={{ margin: "8px 0" }}
                                          />
                                          <Space
                                            align="center"
                                            size={24}
                                            style={{
                                              marginLeft: 8,
                                            }}
                                          >
                                            <Button
                                              size="small"
                                              onClick={() => {
                                                window.open("/dict/add");
                                              }}
                                            >
                                              创建
                                            </Button>
                                            <Button
                                              size="small"
                                              onClick={() => {
                                                loadDictList();
                                              }}
                                            >
                                              刷新
                                            </Button>
                                          </Space>
                                        </>
                                      )}
                                    >
                                      {dictList.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                          {item.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                );
                              default:
                                break;
                            }
                          }}
                        </Form.Item>
                      </Space>
                    </Collapse.Panel>
                  ))}
                </Collapse>
                <Form.Item>
                  <Space
                    direction="vertical"
                    style={{ width: "100%", marginTop: 16 }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => add(DEFAULT_ADD_FIELD)}
                      block
                      icon={<PlusOutlined />}
                    >
                      新增字段
                    </Button>
                    <Button
                      type="dashed"
                      onClick={() => {
                        setImportIndex(
                          // 如果长度为null或undifined则长度赋值为0
                          form.getFieldsValue().fieldList?.length ?? 0
                        );
                        setImportFieldDrawerVisible(true);
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      导入字段
                    </Button>
                    <Button
                      type="dashed"
                      onClick={() => {
                        COMMON_FIELD_LIST.forEach((field) => {
                          add(field);
                        });
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      新增通用字段
                    </Button>
                  </Space>
                </Form.Item>
                <ImportDrawer
                  title="导入字段"
                  visible={importFieldDrawerVisible}
                  onClose={() => setImportFieldDrawerVisible(false)}
                >
                  <InfoCard
                    title="个人字段"
                    showTag={false}
                    onImport={(fieldInfo) => {
                      add(JSON.parse(fieldInfo.content), importIndex);
                      setImportFieldDrawerVisible(false);
                      message.success("导入成功");
                    }}
                    btnText="创建字段"
                  ></InfoCard>
                </ImportDrawer>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Space size="large" wrap>
              <Button type="primary" htmlType="submit" style={{ width: 180 }}>
                一键生成
              </Button>
              <Button
                onClick={() => {
                  const fieldList = form.getFieldsValue().fieldList;
                  if (!fieldList || fieldList.length < 1) {
                    message.error("至少新增 1 个字段");
                    return;
                  }
                  const values = form.getFieldsValue();
                  setInitialValues({
                    name: values.tableComment,
                    content: JSON.stringify(values),
                  } as TableInfoType.TableInfo);
                  setModalParams(TableInfoCreateModal);
                  setCreateModalVisible(true);
                }}
              >
                保存表
              </Button>
              <Button
                onClick={() => {
                  copy(JSON.stringify(form.getFieldsValue()));
                  message.success("已复制到剪切板");
                }}
              >
                复制配置
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
        <CreateModal
          modalVisible={CreateModalVisible}
          initialValues={initialValues}
          onSubmit={() => setCreateModalVisible(false)}
          onCancel={() => setCreateModalVisible(false)}
          modalParams={modalParams}
        />
      </FormInputWrapper>
    </>
  );
});

export default memo(FormInput);
