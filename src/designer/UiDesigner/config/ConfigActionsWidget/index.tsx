import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { observer } from '@formily/react'
import { useShowError } from 'designer/hooks/useShowError'
import { useTranslation } from 'react-i18next'
import { useDesignerParams, useDesignerViewKey } from 'plugin-sdk/contexts/desinger'
import { useRecoilState, useRecoilValue } from 'recoil'
import { deviceConfigChangedState, deviceConfigState } from '../../recoil/atom'
import { useUpsertAppDeviceConfig } from 'designer/hooks/useUpsertAppDeviceConfig'

export const ConfigActionsWidget = observer(() => {
  const { device } = useDesignerParams();
  const key = useDesignerViewKey();
  const [changed, setChanged] = useRecoilState(deviceConfigChangedState(key));
  const appDeviceConfig = useRecoilValue(deviceConfigState(key));
  const { t } = useTranslation();

  const [upsert, { loading, error }] = useUpsertAppDeviceConfig(
    {
      onCompleted: () => {
        message.success(t("OperateSuccess"));
        setChanged(false);
      }
    }
  );

  useShowError(error);

  const handleSave = useCallback(() => {
    const { app, ...other } = appDeviceConfig || {}
    upsert({
      ...other,
      device,
      app: app?.id ? { sync: { id: app.id } } : undefined,
      schemaJson: {
        ...appDeviceConfig?.schemaJson || {},
        entryId: appDeviceConfig?.schemaJson?.entryUuid,
      }
    })
  }, [appDeviceConfig, device, upsert])

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={!changed}
      onClick={handleSave}
    >
      Save
    </Button>
  )
})
