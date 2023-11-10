import React,{ReactNode,forwardRef,memo, useImperativeHandle} from 'react'

interface IProps {
  ref: any;
  children?:ReactNode
}

const FormInput: React.FC<IProps> = forwardRef((IProps, ref) => {
  // 供父组件调用
  useImperativeHandle(ref, () => ({
    setFormValues: (tableSchema: TableSchema) => {
      // form.setFieldsValue(tableSchema);
      console.log(123);
      
    },
  }));

  return (
    <div>FormInput</div>
  )
})

export default memo(FormInput)
