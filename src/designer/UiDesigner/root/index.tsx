import { createBehavior } from "@designable/core";
import { observer } from "@formily/react";
import { DnFC } from "designable/react";
import { RootLocales } from "./locales";

export const RootComponent: DnFC = observer(
  (props: any) => {
    return (
      <div {...props}  >
        {props.children}
      </div>
    )
  }
)

RootComponent.Behavior = createBehavior({
  name: 'RootComponent',
  selector: 'RootComponent',
  designerProps: {
    droppable: true,
  },
  designerLocales: RootLocales,
})
