import { ISchema } from "@formily/react"
import { AllSchemas } from "designable/formily-antd"

export const createComponentSchema = (
  component: ISchema,
) => {
  return {
    'component-group': component && {
      type: 'void',
      'x-component': 'CollapseItem',

      properties: {
        ...component
      }
    },
    'component-style-group': {
      type: 'void',
      'x-component': 'CollapseItem',
      'x-component-props': { defaultExpand: false },
      properties: {
        'x-component-props.style': AllSchemas.CSSStyle,
      },
    },
  }
}
export const createVoidSchema = (
  component: ISchema,
) => {
  
  return {
    type: 'object',
    properties: {
      ...createComponentSchema(component),
    },
  }
}
