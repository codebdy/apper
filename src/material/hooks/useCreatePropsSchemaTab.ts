import { useCallback } from "react"

export const createComponentSchemaTab = (
  component: any,
  decorator: any
) => {
  return {
    'component-tab': {
      type: 'void',
      'x-component': 'SettingsTab.TabPane',
      'x-component-props': {
        tab: "SettingsForm.Properties"
      },
      properties: {
        'component-group': component && {
          type: 'void',
          'x-component': 'CollapseItem',
          properties: {
            'x-component-props': component,
          },
        },
        'decorator-group': decorator && {
          type: 'void',
          'x-component': 'CollapseItem',
          'x-component-props': { defaultExpand: false },
          'x-reactions': {
            fulfill: {
              state: {
                visible: '{{!!$form.values["x-decorator"]}}',
              },
            },
          },
          properties: {
            'x-decorator-props': decorator,
          },
        },
      }
    },
  }
}

export function useCreatePropsSchemaTab() {
  const create = useCallback((propsSchema?: any/*IPropsSchema*/) => {
    if (!propsSchema?.props || Object.keys(propsSchema.props).length === 0) {
      return {}
    }
    return createComponentSchemaTab(propsSchema.props as any, propsSchema.decorator === true /*&& AllSchemas.FormItem*/ as any)
  }, [])

  return create
}