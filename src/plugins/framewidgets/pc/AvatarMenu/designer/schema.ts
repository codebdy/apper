import { IPropsSchema } from 'plugin-sdk'

const schema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
  actions: ['onClick']
}

export default schema