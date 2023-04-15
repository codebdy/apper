import { UmlEditor } from "UmlEditor"
import { memo } from "react"
import SaveActions from "./SaveActions"

export const ServiceModel = memo(() => {
  return (
    <UmlEditor
      options={{ supportCustomizedApi: true }}
      actions={<SaveActions metaId="" />}
    />
  )
})