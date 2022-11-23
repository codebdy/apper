import { ISchema } from '@formily/react'
import { Events } from 'plugin-sdk'

const schema: ISchema = {
  cursor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  }

} as any

export default schema