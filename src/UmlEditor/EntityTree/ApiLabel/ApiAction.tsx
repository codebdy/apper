import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteApi } from "UmlEditor/hooks/useDeleteApi";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta } from "UmlEditor/meta";
import { Button } from "antd";
import React, { memo, useCallback } from "react"

export const ApicAction = memo((
  props: {
    api: MethodMeta,
  }
) => {
  const { api } = props;
  const metaId = useMetaId();
  const deleteApi = useDeleteApi(metaId)

  const handleDelete = useCallback(() => {
    deleteApi(api.uuid)
  }, [deleteApi, api.uuid]);

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
