import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { useMetaId } from "../hooks/useMetaId";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { MethodOperateType } from "UmlEditor/meta";
import { useCreateNewApi } from "UmlEditor/hooks/useCreateNewApi";

export const APIRootAction = memo(() => {
  const metaId = useMetaId();

  const { t } = useTranslation();

  const createApi = useCreateNewApi(metaId)

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])


  const items: MenuItemType[] = useMemo(() => (
    [
      {
        label: t("UmlEditor.AddQueryApi"),
        key: '0',
        onClick: e => {
          createApi(MethodOperateType.Query);
        },
      },
      {
        label: t("UmlEditor.AddMutationApi"),
        key: '1',
        onClick: e => {
          createApi(MethodOperateType.Mutation);
        },
      },
    ]
  ), [createApi, t]);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})