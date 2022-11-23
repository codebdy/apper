import { ISchema } from "@formily/react"
import { CSSStyleShema } from "plugin-sdk/schemas/cssStyleSchema"

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
        'style': CSSStyleShema,
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
