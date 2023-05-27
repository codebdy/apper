import { message } from "antd";
import { getTheFiles } from "hooks/useAppOpenFile";
import { useCallback } from "react";
import { IServieJson } from "../interfaces";
import { useImportModel } from "UmlEditor/hooks/useImportModel";

export function useImportServiceJson(metaId: string) {
  const importMeta = useImportModel(metaId);

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file: any) => {
        file.text().then((fileData: any) => {
          try {
            const serviceJson: IServieJson = JSON.parse(fileData);
            const meta = serviceJson.meta?.content
            meta && importMeta(meta)

          } catch (error: any) {
            console.error(error);
            message.error("file illegal");
          }
        });
      });
    });
  }, [importMeta]);

  return doImport
}