import React from "react";
import { memo } from "react";
import { PredefinedMaterialTabContext } from "./context";
import { usePredefinedMaterialTabs } from "./hooks/usePredefinedMaterialTabs";

export const PredefinedMaterialsRoot = memo((
  props: {
    children: React.ReactNode,
  }
) => {
  const predefinedTabs = usePredefinedMaterialTabs();

  return (
    <PredefinedMaterialTabContext.Provider value={predefinedTabs}>
      {props.children}
    </PredefinedMaterialTabContext.Provider>
  )
})