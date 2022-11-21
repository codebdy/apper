import React from "react"
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { ArrayField } from "@formily/core";
import { ArrayBase } from "formily/antd4";

export interface IArrayPanelProps {
  value?: boolean,
  onChange?: (value?: boolean) => void,
}

const ArrayBaseAny = ArrayBase as any;

export const ArrayPanel = observer((props: IArrayPanelProps) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []

  if (!schema) throw new Error('can not found schema object')

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items

      const content = (
        <RecursionField
          schema={items as any}
          name={index}
        />
      )
      return (
        <ArrayBaseAny
          key={index}
          index={index}
          record={() => dataSource[index]}
        >
          {content}
        </ArrayBaseAny>
      )
    })
  }

  const renderEmpty = () => {
    if (dataSource?.length) return
    return (
      <></>
    )
  }

  return (
    <ArrayBase>
      {renderEmpty()}
      {renderItems()}
    </ArrayBase>
  )
})