import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const subLogicFlowSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "SubLogicFlowSelect",
      "x-field": {
        name: "config.param.logicFlowId",
        params: {
          withBind: true,
        }
      },
    },
  ],
}