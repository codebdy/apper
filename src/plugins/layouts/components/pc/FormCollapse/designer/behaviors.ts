import { IBehavior } from "plugin-sdk";
import Name, { CollapsePanelName } from "../name";
import { FormCollapse, FormCollapsePanel } from "./locales";
import { FormCollapseSchema, FormCollapsePaneSchema } from "./schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === Name,
    designerProps: {
      droppable: true,
      allowAppend: (target, source) =>
        target.children.length === 0 ||
        source?.every((node) => node.props?.['x-component'] === CollapsePanelName) as any,
    },
    designerLocales: FormCollapse,
    schema: FormCollapseSchema,
  },
  {
    name: CollapsePanelName,
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === CollapsePanelName,
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props?.['x-component'] === 'FormTab',
    },
    designerLocales: FormCollapsePanel,
    schema: FormCollapsePaneSchema,
  }
]

export default behaviors