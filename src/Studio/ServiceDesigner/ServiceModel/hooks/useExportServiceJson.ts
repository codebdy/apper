import { saveFile } from "UmlEditor/hooks/helper/saveFile";
import { message } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IServieJson } from "../interfaces";

export function useExportServiceJson(metaId: string) {
  const { t } = useTranslation();
  const doExport = useCallback((serviceJson: IServieJson) => {

    saveFile(`service-${serviceJson.service?.id}`, JSON.stringify(serviceJson, null, 2)).then(
      (savedName) => {
        if (savedName) {
          message.success(t("OperateSuccess"))
        }
      }
    );
  }, [t]);

  return doExport
}