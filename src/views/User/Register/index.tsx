import React,{ReactNode,memo} from 'react'

interface IProps {
  children?:ReactNode
}

const Register: React.FC<IProps> = () => {
  return <div>Register</div>
}

export default memo(Register)
