import { useCallback } from "react";
import { IBehavior, IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
//import { DnFC,DnComponent } from "designable/react"
import { createBehavior, createResource } from '@designable/core'
import { Material } from "../model";

export function useConvertMaterialFromPlugin() {
  const convertBehaviors = useCallback((behaviors: IBehavior[]) => {
    return behaviors?.map(behavior => {
      const { schema, ...other } = behavior;
      return {
        ...other,
        designerProps: {
          ...behavior.designerProps,
          propsSchema: schema,
        },
      }
    }
    ) || []
  }, [])

  const transComponment = useCallback((material: IMaterialComponent): Material => {
    const Resource = createResource(...(material.resources || []))

    const dnfc: any = material.designer;

    if (material.behaviors) {
      const Behavior = createBehavior(...(convertBehaviors(material.behaviors) as any))
      dnfc.Behavior = Behavior
    }

    dnfc.Resource = Resource
    return {
      name: material.name,
      designer: dnfc,
      component: material.component,
    }
  }, [convertBehaviors])

  const convertMaterialFromPlugin = useCallback((material: IMaterialComponent) => {//Material
    return transComponment(material)
  }, [transComponment])

  return convertMaterialFromPlugin;
}