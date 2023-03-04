import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { observer } from '@formily/react'
import { useUpdatePage } from 'designer/hooks/useUpdatePage'
import { useSelectedPageId } from '../hooks/useSelectedPageId'
import { useShowError } from 'designer/hooks/useShowError'
import { useTranslation } from 'react-i18next'

export const ActionsWidget = observer(() => {
  const pageId = useSelectedPageId();
  const { t } = useTranslation();
  const [update, { loading, error }] = useUpdatePage({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    // update({ id: pageId, schemaJson: transformToSchema(designer.getCurrentTree()) });
  }, [])

  return (
    <Button
      type="primary"
      disabled={!pageId}
      loading={loading}
      onClick={handleSave}
    >
      Save
    </Button>
  )
})
