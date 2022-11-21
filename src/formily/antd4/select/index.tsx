import React from 'react'
import { connect, mapReadPretty, mapProps, ReactFC } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { SelectProps } from 'antd/es/select'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'

export const Select: ReactFC<SelectProps<any, any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          (field as any)?.['loading'] || (field as any)?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select