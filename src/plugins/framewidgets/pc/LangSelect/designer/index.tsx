import { DnFC } from 'designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import { TranslationOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<TranslationOutlined {...props} />}
    />
  )
})

export default ComponentDesigner