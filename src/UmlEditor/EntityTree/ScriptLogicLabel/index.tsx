import React, { useEffect, useState } from "react";
import { memo } from "react";
import { LogicScriptAction } from "./LogicScriptAction";
import { MethodMeta } from "UmlEditor/meta";
import TreeNodeLabel from "common/TreeNodeLabel";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: MethodMeta
  }
) => {
  const { scriptMeta } = props;
  const [name, setName] = useState(scriptMeta.name);

  useEffect(() => {
    setName(scriptMeta.name)
  }, [scriptMeta])


  return (
    <TreeNodeLabel
      action={
        <LogicScriptAction logicScript={scriptMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
