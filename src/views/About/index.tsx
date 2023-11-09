import React,{ReactNode,memo} from 'react'

interface IProps {
  children?:ReactNode
}

const About: React.FC<IProps> = () => {
  return <div>About</div>
}

export default memo(About)
