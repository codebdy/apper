import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const contextReadSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$value",
      },
      children: [
        {
          componentName: "ValueInput",
          "x-field": {
            name: `config.value`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}