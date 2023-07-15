import { MethodMeta } from "UmlEditor/meta";
import { EditorStore } from "@rxdrag/minions-logicflow-editor";
import { createContext } from "react";

export const LogicFlowEditorStoreContext = createContext<EditorStore | undefined>(undefined)

export interface ILogicFlowContext {
  subLogicFlows: MethodMeta[]
}