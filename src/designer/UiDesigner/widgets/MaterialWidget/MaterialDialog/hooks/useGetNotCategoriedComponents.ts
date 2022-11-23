import { useDesignerParams } from "plugin-sdk/contexts/desinger";
import { useCallback } from "react";
import { IMaterialTab, IPlugin } from "plugin-sdk";

export function useGetNotCategoriedComponents(tabs: IMaterialTab[]) {
  const { device } = useDesignerParams();
  const getComponents = useCallback((plugin?: IPlugin) => {
    return plugin?.components?.[device as any].filter(
      com => !tabs?.find(
        tab => tab.collopsesItems?.find(
          group => group.components?.find(
            name => name === com.name
          )
        )
      )
    ) || []
  }, [device, tabs])

  return getComponents;
}