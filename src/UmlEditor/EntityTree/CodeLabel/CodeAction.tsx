import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteCodes } from "UmlEditor/hooks/useDeleteCodes";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";
import { Button } from "antd";
import React, { memo, useCallback } from "react"

export const CodeAction = memo((
  props: {
    code: CodeMeta,
  }
) => {
  const { code } = props;
  const metaId = useMetaId();
  const deleteCodes = useDeleteCodes(metaId)

  const handleDelete = useCallback(() => {
    deleteCodes(code.uuid)
  }, [deleteCodes, code.uuid]);

  return (
    <Button
      type="text"
      shape='circle'
      size='small'
      onClick={handleDelete}
      style={{ color: "inherit" }}
    >
      <DeleteOutlined />
    </Button>
  )
})
