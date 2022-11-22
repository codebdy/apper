import { createBehavior, GlobalRegistry } from "@designable/core";
import { RootLocales } from "./locales";

export const RootBehavior = createBehavior({
  name: 'Root',
  selector: 'Root',
  designerProps: {
    droppable: true,
  },
  designerLocales: RootLocales,
})

GlobalRegistry.registerDesignerBehaviors(
  {
    "Root": {
      Behavior: RootBehavior
    }
  }
)