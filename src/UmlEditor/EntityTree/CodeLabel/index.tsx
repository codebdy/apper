import React, { useEffect, useState } from "react";
import { memo } from "react";
import { CodeAction } from "./CodeAction";
import TreeNodeLabel from "common/TreeNodeLabel";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";

export const CodeLabel = memo((
  props: {
    codeMeta: CodeMeta
  }
) => {
  const { codeMeta } = props;
  const [name, setName] = useState(codeMeta.name);

  useEffect(() => {
    setName(codeMeta.name)
  }, [codeMeta])


  return (
    <TreeNodeLabel
      action={
        <CodeAction code={codeMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
