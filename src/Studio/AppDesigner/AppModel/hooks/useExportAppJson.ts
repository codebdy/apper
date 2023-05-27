import { IAppJson } from "../interfaces";
import { saveFile } from "UmlEditor/hooks/helper/saveFile";
import { message } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useExportAppJson(metaId: string) {
  const { t } = useTranslation();
  const doExport = useCallback((app: IAppJson) => {

    saveFile(`app-${app.app?.id}`, JSON.stringify(app, null, 2)).then(
      (savedName) => {
        if (savedName) {
          message.success(t("OperateSuccess"))
        }
      }
    );
  }, [t]);

  return doExport
}