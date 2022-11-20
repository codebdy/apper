import { useCallback } from "react";
import { useUploadZip } from "AppDesigner/AppPlugins/hooks/useUploadZip";
import { getTheFiles } from "shared/action/hooks/useOpenFile";

export function useUploadTempltes() {
  const uploadZip = useUploadZip("templates")

  const doImport = useCallback(async () => {
    try {
      const files = await Promise.all(
        (await getTheFiles(".zip", false)).map(async (fileHandle: any) => {
          const file = await fileHandle.getFile();
          return file;
        })
      );

      if (files?.length > 0) {
        return await uploadZip(files[0])
      } else {
        throw new Error("Can not find file")
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }, [uploadZip])

  return doImport;
}