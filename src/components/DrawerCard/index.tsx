import React,{ReactNode,memo} from 'react'

interface IProps {
  onLoad:any
  onImport?:(valuse:any)=>void
  children?:ReactNode
}

const DrawerCard: React.FC<IProps> = (IProps) => {
  const {onLoad,onImport}=IProps
  return <div>4214</div>
}

export default memo(DrawerCard)
