import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { observer } from '@formily/react'
import { useTranslation } from 'react-i18next'
import { useShowError } from 'designer/hooks/useShowError'
import { ID } from 'shared'
import { useUpsertPageFrame } from './hooks/useUpsertPageFrame'

export const ActionsWidget = observer((props: {
  templateId?: ID,
}) => {
  const { templateId } = props;
  const { t } = useTranslation();
  const [update, { loading, error }] = useUpsertPageFrame({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    // update({ id: templateId, schemaJson: transformToSchema(designer.getCurrentTree()) });
  }, [])

  return (
    <Button
      type="primary"
      disabled={!templateId}
      loading={loading}
      onClick={handleSave}
    >
      Save
    </Button>
  )
})
