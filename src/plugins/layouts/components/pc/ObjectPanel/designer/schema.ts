import { DataBindSourceType, FieldsType, IPropsSchema } from 'plugin-sdk'

const schema: IPropsSchema = {
  display: {
    dataBindSourceType: DataBindSourceType.Single,
    fieldSourceType: FieldsType.Single,
  },
  props: {
    type: 'object',
    properties: {
    },
  }
}

export default schema