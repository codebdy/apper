import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { Dropdown } from "antd"
import { RecursionField, Schema, useFieldSchema } from "@formily/react"

export interface IDropdownProps {
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  children?: React.ReactNode,
}

const Component: React.FC<IDropdownProps> = observer((props) => {
  const { placement, trigger } = props;
  const fieldSchema = useFieldSchema();

  const slots: any = useMemo(() => {
    const slts = {
      button: null,
      pannel: null,
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'Dropdown.PopupPanel') {
        slts.button = childSchema
      } else if (childSchema["x-component"] === 'Dropdown.Button') {
        slts.pannel = childSchema
      }
    }

    return slts;
  }, [fieldSchema])



  return (
    <Dropdown
      overlay={slots.pannel && <RecursionField schema={slots.pannel} name={slots.pannel.name} />}
      placement={placement}
      trigger={trigger}
    >
      {slots.button && <RecursionField schema={slots.button} name={slots.button.name} />}
    </Dropdown>
  )
})

export default Component;