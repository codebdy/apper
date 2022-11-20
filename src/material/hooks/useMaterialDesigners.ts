import { useMemo } from "react";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "../context";

export function useMaterialDesigners() {
  const { basicTab, frameworkTab } = usePredefinedMaterialTab();
  const { uploadedMaterialTabs } = useAppMaterialTabs();
  const materialDesigners = useMemo(() => {
    const designers = {} as any;

    for (const tab of [...uploadedMaterialTabs, basicTab, frameworkTab]) {
      for (const group of tab?.groups || []) {
        for (const material of group?.materials || []) {
          designers[material.name] = material.designer
        }
      }
    }
    return designers
  }, [basicTab, frameworkTab, uploadedMaterialTabs])

  return materialDesigners;
}