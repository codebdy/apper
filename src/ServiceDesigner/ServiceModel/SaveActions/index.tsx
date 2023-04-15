import { Space, Button, message } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import PublishButton from "./PublishButton";
import { useShowError } from "AppDesigner/hooks/useShowError";
import { useTranslation } from "react-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { ID } from "shared";
import { IService } from "model";
import { changedState } from "UmlEditor/recoil/atoms";
import { useGetMeta } from "UmlEditor/hooks/useGetMeta";
import { useValidate } from "UmlEditor/hooks/useValidate";
import { Operate } from "../Operate";
import { useUpsertMeta } from "hooks/useUpsertMeta";
import { IMeta } from "model/meta";
import { useService } from "ServiceDesigner/contexts";
import { useUpsertService } from "hooks/useUpsertService";

const SaveActions = memo((props: {
  metaId: ID
}) => {
  const { metaId } = props;
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
    save({ id: metaId, content: data });
  }, [getMeta, metaId, save, validate]);

  return (
    <Space>
      <Operate />
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
    </Space>
  )
})

export default SaveActions;