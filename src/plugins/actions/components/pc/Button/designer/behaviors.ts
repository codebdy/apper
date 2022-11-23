import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import locales from "./locales";
import schema from "./schema";
import { createVoidSchema } from "plugin-sdk";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: [],
    selector: (node) => node.componentName === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: locales,
    schema: createVoidSchema(schema) as any,//临时测试要修改类型
  }
]

export default behaviors