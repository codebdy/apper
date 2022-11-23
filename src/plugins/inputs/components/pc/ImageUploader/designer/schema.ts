import { FieldsType, IPropsSchema } from 'plugin-sdk'

const schema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single
  },
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'MultiLangInput',
      },
    },
  }
}

export default schema;
