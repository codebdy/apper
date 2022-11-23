import { IBehavior } from "plugin-sdk";
import Name from "../name";
import { SwitchLocales } from "./locales";
import { SwitchSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: SwitchLocales,
    schema: SwitchSchema,
  },

]

export default behaviors