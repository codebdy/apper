import { FieldsType, IPropsSchema } from 'plugin-sdk'

export const CheckboxSchema: IPropsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      autoFocus: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }
}
