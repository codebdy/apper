import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import { createVoidSchema } from "plugin-sdk";
import Name from "../name";
import locales from "./locales";
import schema from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: [/*'Box'*/],
    selector: (node) => node.componentName === Name,
    designerProps: {
      droppable: true,
    },
    designerLocales: locales,
    schema: createVoidSchema(schema) as any,//临时测试要修改类型
  }
]

export default behaviors