import { Space, Button, message } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import PublishButton from "./PublishButton";
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { IApp } from "model";
import { useUpsertApp } from "hooks/useUpsertApp";
import { changedState } from "UmlEditor/recoil/atoms";
import { useGetMeta } from "UmlEditor/hooks/useGetMeta";
import { useValidate } from "UmlEditor/hooks/useValidate";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { useApp } from "../../contexts";
import { useUpsertMeta } from "hooks/useUpsertMeta";
import { IMeta } from "model/meta";

const SaveActions = memo((props: {
}) => {
  const metaId = useMetaId() || "";
  const app = useApp();
  const [changed, setChanged] = useRecoilState(changedState(metaId));
  const getMeta = useGetMeta(metaId);
  const { t } = useTranslation();
  const [saveApp, { loading: appSaving, error: serviceError }] = useUpsertApp({
    onCompleted(data: IApp) {
      message.success(t("OperateSuccess"));
      setChanged(false);
    }
  })

  const [save, { loading, error }] = useUpsertMeta({
    onCompleted(data: IMeta) {
      if (app?.metaId) {
        message.success(t("OperateSuccess"));
        setChanged(false);
      } else {
        saveApp({ id: app?.id, metaId: data.id })
      }
    }
  })

  const validate = useValidate(metaId);

  useShowError(error || serviceError);

  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const data = getMeta()
    save({ id: metaId ? metaId : undefined, content: data });
  }, [getMeta, metaId, save, validate]);

  return (
    <Space>
      <Button
        type="primary"
        disabled={!changed}
        icon={<SaveOutlined />}
        loading={loading||appSaving}
        onClick={handleSave}
      >
        {t("Save")}
      </Button>
      <PublishButton />
    </Space>
  )
})

export default SaveActions;