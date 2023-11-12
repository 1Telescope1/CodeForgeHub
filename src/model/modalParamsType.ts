export interface inputModalParamsType {
  title:string
  placeholder:string
  constant:any
  onFinish:(values:any)=>void
}

export interface createModalParamsType {
  title:string
  columns:any[]
  handleAdd:(values: any)=>Promise<boolean>
}