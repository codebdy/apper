import { Space, Button, message } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import PublishButton from "./PublishButton";
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { IService } from "model";
import { changedState } from "UmlEditor/recoil/atoms";
import { useGetMeta } from "UmlEditor/hooks/useGetMeta";
import { useValidate } from "UmlEditor/hooks/useValidate";
import { Operate } from "../Operate";
import { useUpsertMeta } from "hooks/useUpsertMeta";
import { IMeta } from "model/meta";
import { useService } from "../../contexts";
import { useUpsertService } from "hooks/useUpsertService";
import { useMetaId } from "UmlEditor/hooks/useMetaId";

const SaveActions = memo(() => {
  const metaId = useMetaId() || "";
  const service = useService();
  const [changed, setChanged] = useRecoilState(changedState(metaId));
  const getMeta = useGetMeta(metaId);
  const { t } = useTranslation();
  const [saveService, { loading: serviceSaving, error: serviceError }] = useUpsertService({
    onCompleted(data: IService) {
      message.success(t("OperateSuccess"));
      setChanged(false);
    }
  })

  const [save, { loading, error }] = useUpsertMeta({
    onCompleted(data: IMeta) {
      if (service?.metaId) {
        message.success(t("OperateSuccess"));
        setChanged(false);
      } else {
        saveService({ id: service?.id, metaId: data.id })
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
        loading={loading || serviceSaving}
        onClick={handleSave}
      >
        {t("Save")}
      </Button>
      <PublishButton />
      <Operate />
    </Space>
  )
})

export default SaveActions;