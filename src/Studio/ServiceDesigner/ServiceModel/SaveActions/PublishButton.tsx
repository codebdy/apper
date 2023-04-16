import { SyncOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useShowError } from 'AppDesigner/hooks/useShowError';
import { EVENT_DATA_POSTED, trigger } from 'enthooks/events';
import { usePublished } from 'hooks/usePublished';
import { changedState } from 'UmlEditor/recoil/atoms';
import { useMetaId } from 'UmlEditor/hooks/useMetaId';
import { usePublishMeta } from 'hooks/usePublishMeta';

const PublishButton = memo(() => {
  const metaId = useMetaId();
  const changed = useRecoilValue(changedState(metaId))
  const published = usePublished()
  const { t } = useTranslation();

  const [publish, { loading, error }] = usePublishMeta(metaId, {
    onCompleted() {
      trigger(EVENT_DATA_POSTED, { entity: "Meta" })
      message.success(t("OperateSuccess"));
    },
  });

  useShowError(error);

  const handlePublish = useCallback(() => {
    publish()
  }, [publish])


  return (
    <Button
      disabled={published || changed}
      type='primary'
      loading={loading}
      icon={<SyncOutlined />}
      onClick={handlePublish}
    >
      {t("Publish")}
    </Button>
  )
});

export default PublishButton;