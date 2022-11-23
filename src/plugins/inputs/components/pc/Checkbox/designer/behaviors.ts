import { IBehavior } from "plugin-sdk";
import Name from "../name";
import { CheckboxLocales } from "./locales";
import { CheckboxSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: CheckboxLocales,
    schema: CheckboxSchema,
  },

]

export default behaviors