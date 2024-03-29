import { message } from "antd";
import { getTheFiles } from "hooks/useAppOpenFile";
import { useCallback } from "react";
import { IAppJson } from "../interfaces";
import { useImportModel } from "UmlEditor/hooks/useImportModel";

export function useImportAppJson(metaId: string) {
  const importMeta = useImportModel(metaId);

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file: any) => {
        file.text().then((fileData: any) => {
          try {
            const appJson: IAppJson = JSON.parse(fileData);
            const meta = appJson.meta?.content
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