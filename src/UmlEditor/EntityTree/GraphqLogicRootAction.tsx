import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";

export const GraphqLogicRootAction = memo(() => {

  const { t } = useTranslation();


  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Dropdown menu={{items:[
      {
        label: t("UmlEditor.AddQuery"),
        key: '12',
        onClick: e => {
          //addOrchestration(MethodOperateType.Query);
        },
      },
      {
        label: t("UmlEditor.AddMutation"),
        key: '13',
        onClick: e => {
          //addOrchestration(MethodOperateType.Mutation);
        },
      },
    ]}} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})
