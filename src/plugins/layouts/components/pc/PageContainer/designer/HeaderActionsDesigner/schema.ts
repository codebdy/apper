import { IPropsSchema } from "plugin-sdk";

const HeaderActionsSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      gridSpan: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 1,
        },
      },
    },
  }
}

export default HeaderActionsSchema;
