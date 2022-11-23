import { FieldsType, IPropsSchema } from 'plugin-sdk'

const CommonDatePickerAPI = {
  allowClear: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  autoFocus: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  bordered: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      defaultChecked: true,
    },
  },
  disabledTime: {
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  disabledDate: {
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      include: ['EXPRESSION'],
    },
  },
  inputReadOnly: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  placeholder: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  size: {
    type: 'string',
    enum: ['large', 'small', 'middle', ""],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      defaultValue: 'middle',
    },
  },
  format: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      placeholder: 'YYYY-MM-DD',
    },
  },
}

export const DatePickerSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },

  props: {
    type: 'object',
    properties: {
      picker: {
        type: 'string',
        enum: ['time', 'date', 'month', 'year', 'quarter', 'decade'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'date',
        },
      },
      ...CommonDatePickerAPI,
      showNow: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      showTime: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      showToday: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }
}

export const DateRangePickerSchema: IPropsSchema = {
  display:{
    fieldSourceType: FieldsType.Single,
  },
  
  props: {
    type: 'object',
    properties: {
      picker: {
        type: 'string',
        enum: ['time', 'date', 'month', 'year', 'decade'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'date',
        },
      },
      ...CommonDatePickerAPI,
      showTime: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  }

}
