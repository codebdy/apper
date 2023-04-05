import { useCallback } from "react";
import { IOpenFileAction } from "plugin-sdk";

export async function getTheFiles(accept: string, multiple?: boolean) {
  // open file picker
  const fileHandles = await (window as any).showOpenFilePicker({
    types: [{
      accept: {
        "file/*": accept?.split(",")
      },
    }],
    excludeAcceptAllOption: false,
    multiple: multiple,
  });

  return fileHandles;
}

export function useOpenFile() {
  const open = useCallback(async () => {
    const allFiles = await Promise.all(
      (await getTheFiles("*.json", false)).map(async (fileHandle: any) => {
        const file = await fileHandle.getFile();
        return file;
      })
    );

    return allFiles?.[0];

  }, [])

  return open;
}