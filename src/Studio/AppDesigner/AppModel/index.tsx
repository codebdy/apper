import { UmlEditor } from "UmlEditor"
import { memo } from "react"
import SaveActions from "./SaveActions"

export const AppModel = memo(() => {
  return (<UmlEditor
    metaContent={undefined}
    metaId={undefined}
    actions={<SaveActions />}
  />)
})