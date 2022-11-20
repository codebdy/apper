import React, { memo } from "react"
import { DnFC } from 'designable/react'
import { DroppableWidget } from "designable/react"
import { IQueryFormProps, QueryForm } from "../../view/QueryForm"

export const QueryFormDesigner: DnFC<IQueryFormProps> = memo((
  props
) => {
  const { children, ...rest } = props;
  return (
    <QueryForm {...rest}>
      {
        children ? children : <DroppableWidget />
      }
    </QueryForm>
  )
}) 
