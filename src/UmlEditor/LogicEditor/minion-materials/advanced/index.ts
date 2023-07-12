import { IActivityMaterial } from "@rxdrag/minions-schema";
import { subLogicFlowMaterial } from "./subLogicFlow2";
import { customizedLoopMaterial } from "./customizedLoop";

export const advancedActivities: IActivityMaterial<any, any, any, any>[] = [
  customizedLoopMaterial,
  subLogicFlowMaterial,
]