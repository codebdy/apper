import { MoreOutlined } from "@ant-design/icons";
import { useCreateNewGraphLogic } from "UmlEditor/hooks/useCreateNewGraphLogic";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodOperateType } from "UmlEditor/meta";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";

export const GraphLogicRootAction = memo(() => {

  const { t } = useTranslation();
  const metaId = useMetaId()
  const addGraphLogic = useCreateNewGraphLogic(metaId)

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Dropdown menu={{
      items: [
        {
          label: t("UmlEditor.AddQueryGraph"),
          key: '12',
          onClick: e => {
            addGraphLogic(MethodOperateType.Query);
          },
        },
        {
          label: t("UmlEditor.AddMutationGraph"),
          key: '13',
          onClick: e => {
            addGraphLogic(MethodOperateType.Mutation);
          },
        },
      ]
    }} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})
