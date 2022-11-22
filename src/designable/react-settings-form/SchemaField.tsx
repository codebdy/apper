import { connect, createSchemaField, mapProps } from '@formily/react'
import {
  //FormItem,
  Input,
  NumberPicker,
  DatePicker,
  TimePicker,
  Select,
  Radio,
  Switch,
  Space,
  ArrayItems,
  ArrayTable,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
} from 'formily/antd4'
import { Form, Slider } from 'antd'
import {
  SizeInput,
  ColorInput,
  ImageInput,
  BackgroundImageInput,
  PositionInput,
  CornerInput,
  MonacoInput,
  ValueInput,
  BoxStyleSetter,
  BorderStyleSetter,
  BorderRadiusStyleSetter,
  BackgroundStyleSetter,
  BoxShadowStyleSetter,
  FontStyleSetter,
  DisplayStyleSetter,
  FlexStyleSetter,
  DrawerSetter,
  CollapseItem,
} from './components'

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field:any) => {
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    CollapseItem,
    Input,
    ValueInput,
    SizeInput,
    ColorInput,
    ImageInput,
    MonacoInput,
    PositionInput,
    CornerInput,
    BackgroundImageInput,
    BackgroundStyleSetter,
    BoxStyleSetter,
    BorderStyleSetter,
    BorderRadiusStyleSetter,
    DisplayStyleSetter,
    BoxShadowStyleSetter,
    FlexStyleSetter,
    FontStyleSetter,
    DrawerSetter,
    NumberPicker,
    DatePicker,
    TimePicker,
    Select,
    Radio,
    Slider,
    Switch,
    Space,
    ArrayItems,
    ArrayTable,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
  },
})
