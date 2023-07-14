import { createUuid } from "@rxdrag/shared";
import { constValueSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";
import { contextWriteIcon } from "../../icons";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "../../consts";

export const contextWriteMaterial: IActivityMaterial<ReactNode> = {
  activityName: "contextWrite",
  icon: contextWriteIcon,
  label: "$contextWrite",
  activityType: ActivityType.Activity,
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
  schema: constValueSchema,
}