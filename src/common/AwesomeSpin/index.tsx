import { Spin } from "antd"
import { memo } from "react"

export const AwesomeSpin = memo((
  props: {
    tip?: string,
    spinning?: boolean,
    children?: React.ReactNode,
  }
) => {
  const { spinning, children, ...other } = props;
  return (
    spinning ?
      <Spin spinning={spinning} {...other}>{children}</Spin>
      : <>{children}</>
  )
})