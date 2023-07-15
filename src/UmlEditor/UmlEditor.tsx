import { memo, useMemo } from "react"
import { UmlEditorInner, UmlEditorProps } from "./UmlEditorInner"
import { RecoilRoot } from "recoil"
import { EditorStore } from "@rxdrag/minions-logicflow-editor"
import { LogicFlowEditorStoreContext } from "./LogicEditor/contexts"

export const UmlEditor = memo((props: UmlEditorProps) => {
  const store: EditorStore = useMemo(() => {
    return new EditorStore()
  }, [])

  return <RecoilRoot>
    <LogicFlowEditorStoreContext.Provider value={store}>
      <UmlEditorInner {...props} />
    </LogicFlowEditorStoreContext.Provider>
  </RecoilRoot>
})

UmlEditor.displayName = "UmlEditor"