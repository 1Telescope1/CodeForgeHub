import React,{ReactNode,memo} from 'react'

interface IProps {
  children?:ReactNode
}

const FormInput: React.FC<IProps> = () => {
  return <div>FormInput</div>
}

export default memo(FormInput)
