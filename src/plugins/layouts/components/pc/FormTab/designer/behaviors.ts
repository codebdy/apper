import { IBehavior } from "plugin-sdk";
import Name, { TabPaneName } from "../name";
import { FormTabLocales, FormTabPaneLocales } from "./locales";
import { FormTabSchema, FormTabPaneSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === Name,
    designerProps: {
      droppable: true,
      allowAppend: (target, source) =>
        target.children.length === 0 ||
        source?.every((node) => node.props?.['x-component'] === TabPaneName) as any,
    },
    designerLocales: FormTabLocales,
    schema: FormTabSchema,
  },
  {
    name: TabPaneName,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === TabPaneName,
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props?.['x-component'] === 'FormTab',
    },
    designerLocales: FormTabPaneLocales,
    schema: FormTabPaneSchema,
  }
]

export default behaviors