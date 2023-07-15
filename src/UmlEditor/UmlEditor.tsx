import { memo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"
import { LogicFlowEditorScope } from "@rxdrag/minions-logicflow-editor"

export const UmlEditor = memo((props: UmlEditorProps) => {

  return <RecoilRoot>
    <LogicFlowEditorScope>
      <UmlEditorInner {...props} />
    </LogicFlowEditorScope>
  </RecoilRoot>
})

UmlEditor.displayName = "UmlEditor"