import { Card } from 'antd'
import React,{ReactNode,memo} from 'react'

interface IProps {
  level:LevelType
  children?:ReactNode
}

const SqlProfile: React.FC<IProps> = (IProps) => {
  const {level}=IProps

  return (
    <Card title={level.title}>
      {level.content}
    </Card>
  )
}

export default memo(SqlProfile)
