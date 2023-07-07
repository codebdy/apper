import { ActivityType } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { subLogicFlowSchema } from "./schema";
import { ILogicFlowContext } from "UmlEditor/LogicEditor/ILogicFlowContext";

export interface ISubLogicFlowConfig{
  subFlowId?:string
}

export const subLogicFlowMaterial: IRxDragActivityMaterial<ISubLogicFlowConfig, ILogicFlowContext> = {
  activityName: "subLogicFlow",
  icon: methodIcon,
  label: "$reaction",
  activityType: ActivityType.LogicFlowActivity,
  defaultPorts: {
  },
  subTitle: (config?: ISubLogicFlowConfig, context?: ILogicFlowContext) => {
    const subFlow = context?.subLogicFlows?.find(sub => sub.uuid === config?.subFlowId)
    return subFlow?.name || ""
  },
  schema: subLogicFlowSchema,
}
