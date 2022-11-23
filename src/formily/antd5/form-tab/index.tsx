import React, { Fragment, useMemo } from 'react'
import { Tabs, Badge } from 'antd'
import { TabPaneProps, TabsProps } from 'antd/es/tabs'
import {
  useField,
  ReactFC,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { Schema, SchemaKey } from '@formily/json-schema'
export interface IFormTab {
  activeKey: string
  setActiveKey(key: string): void
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: string | number
  children: React.ReactNode
}

interface IFeedbackBadgeProps {
  name: SchemaKey
  tab: React.ReactNode
}

type ComposedFormTab = React.FC<React.PropsWithChildren<IFormTabProps>> & {
  TabPane: React.FC<React.PropsWithChildren<IFormTabPaneProps>>
  createFormTab: (defaultActiveKey?: string) => IFormTab
}

const useTabs = () => {
  const tabsField = useField()
  const schema = useFieldSchema()
  const tabs = useMemo(()=>{
    const tabs: { name: SchemaKey; props: any; schema: Schema, title?: string }[] = []
    schema.mapProperties((schema, name) => {
      const field = tabsField.query(tabsField.address.concat(name)).take()

      if (field?.display === 'none' || field?.display === 'hidden') return
      if (schema['x-component']?.indexOf('TabPane') > -1) {
        tabs.push({
          name,
          props: {
            key: schema?.['x-component-props']?.key || name,
            ...schema?.['x-component-props'],
          },
          title: field?.title,
          schema,
        })
      }
    })
    return tabs
  }, [schema, tabsField])

  return tabs
}

const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer((props) => {
  const field = useField()
  const errors = field.form.queryFeedbacks({
    type: 'error',
    address: `${field.address.concat(props.name)}.*`,
  })
  if (errors.length) {
    return (
      <Badge size="small" className="errors-badge" count={errors.length}>
        {props.tab}
      </Badge>
    )
  }
  return <Fragment>{props.tab}</Fragment>
})


export const FormTab: ComposedFormTab = observer(
  ({ formTab, ...props }: IFormTabProps) => {
    const tabs = useTabs()
    return (
      <Tabs
        {...props}
        animated = {false}
        onChange={(key) => {
          props.onChange?.(key)
          formTab?.setActiveKey?.(key)
        }}
        items={tabs.map(({ props, schema, name, title }, key) => {
          return {
            key: key as any,
            label: <FeedbackBadge name={name} tab={props.tab || title} />,
            children: <RecursionField schema={schema} name={name} />
          }
        })}
      >
      </Tabs>
    )
  }
) as unknown as ComposedFormTab

const TabPane = observer((
  props: {
    key: string | number,
    children: React.ReactNode
  }
) => {
  return <Fragment>{props.children}</Fragment>
})

FormTab.TabPane = TabPane
export default FormTab
