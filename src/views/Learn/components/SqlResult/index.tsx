import React,{ReactNode,memo} from 'react'

interface IProps {
  children?:ReactNode
}

const SqlResult: React.FC<IProps> = () => {
  return <div>SqlResult</div>
}

export default memo(SqlResult)
