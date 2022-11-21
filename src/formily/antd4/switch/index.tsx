import { Switch as AntdSwitch } from 'antd'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  AntdSwitch,
  mapProps(
    {
      value: 'checked',
    },
    (props) => {
      const onChange = props.onChange
      delete (props as any)['value']
      return {
        ...props,
        onChange(checked) {
          onChange?.(checked, null as any)
        },
      }
    }
  )
)

export default Switch
