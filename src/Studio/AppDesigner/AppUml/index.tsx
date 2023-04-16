import { UmlEditor } from "UmlEditor"
import { memo } from "react"
import SaveActions from "./SaveActions"

export const AppUml = memo(() => {
  return (<UmlEditor
    metaContent={undefined}
    metaId={undefined}
    actions={<SaveActions />}
  />)
})