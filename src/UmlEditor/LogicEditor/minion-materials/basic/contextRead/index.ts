import { createUuid } from "@rxdrag/shared";
import { contextReadSchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { contextReadIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";

export const contextReadMaterial: IActivityMaterial<ReactNode> = {
  activityName: "contextRead",
  icon:contextReadIcon,
  label: "$contextRead",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: contextReadSchema,
}