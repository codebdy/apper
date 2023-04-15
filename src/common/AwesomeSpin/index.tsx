import { Spin } from "antd"
import { memo } from "react"

export const AwesomeSpin = memo((
  props: {
    spinning?: boolean,
    children?: React.ReactNode,
  }
) => {
  const { spinning, children } = props;
  return (
    spinning ?
      <Spin spinning={spinning}>{children}</Spin>
      : <>children</>
  )
})