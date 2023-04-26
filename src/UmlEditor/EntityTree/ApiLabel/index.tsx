import React, { useEffect, useState } from "react";
import { memo } from "react";
import { ApicAction } from "./ApiAction";
import { MethodMeta } from "UmlEditor/meta";
import TreeNodeLabel from "common/TreeNodeLabel";

export const ApiLabel = memo((
  props: {
    apiMeta: MethodMeta
  }
) => {
  const { apiMeta } = props;
  const [name, setName] = useState(apiMeta.name);

  useEffect(() => {
    setName(apiMeta.name)
  }, [apiMeta])


  return (
    <TreeNodeLabel
      action={
        <ApicAction api={apiMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
