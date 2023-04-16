import { Space, Button, message } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import PublishButton from "./PublishButton";
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { ID } from "shared";
import { IApp } from "model";
import { useUpsertApp } from "hooks/useUpsertApp";
import { changedState } from "UmlEditor/recoil/atoms";
import { useGetMeta } from "UmlEditor/hooks/useGetMeta";
import { useValidate } from "UmlEditor/hooks/useValidate";
import { useMetaId } from "UmlEditor/hooks/useMetaId";

const SaveActions = memo((props: {
}) => {
  const metaId = useMetaId();
  const [changed, setChanged] = useRecoilState(changedState(metaId));
  const getMeta = useGetMeta(metaId);
  const { t } = useTranslation();
  const [save, { loading, error }] = useUpsertApp({
    onCompleted(data: IApp) {
      message.success(t("OperateSuccess"));
      setChanged(false);
    }
  })

  const validate = useValidate(metaId);

  useShowError(error);

  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const data = getMeta()
    //save({ id: metaId, meta: data, saveMetaAt: new Date() });
  }, [getMeta, validate]);

  return (
    <Space>
      <Button
        type="primary"
        disabled={!changed}
        icon={<SaveOutlined />}
        loading={loading}
        onClick={handleSave}
      >
        {t("Save")}
      </Button>
      <PublishButton />
    </Space>
  )
})

export default SaveActions;