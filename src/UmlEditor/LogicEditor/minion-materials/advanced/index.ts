import { IActivityMaterial } from "@rxdrag/minions-schema";
import { subLogicFlowMaterial } from "./subLogicFlow";
import { customizedLoopMaterial } from "./customizedLoop";
import { transactionMaterial } from "./transaction";

export const advancedActivities: IActivityMaterial<any, any, any, any>[] = [
  customizedLoopMaterial,
  transactionMaterial,
  subLogicFlowMaterial,
]