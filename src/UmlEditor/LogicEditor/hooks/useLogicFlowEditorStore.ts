import { useContext } from "react";
import { LogicFlowEditorStoreContext } from "../contexts";

export function useLogicFlowEditorStore(){
  return useContext(LogicFlowEditorStoreContext)
}