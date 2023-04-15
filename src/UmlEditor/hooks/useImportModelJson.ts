import { message } from "antd";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { getTheFiles } from "shared/action/hooks/useOpenFile";
import { MetaContent } from "../meta";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useImportModelJson(metaId: string) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setClasses = useSetRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const setX6Nodes = useSetRecoilState(x6NodesState(metaId));
  const setX6Edges = useSetRecoilState(x6EdgesState(metaId));
  const setPackages = useSetRecoilState(packagesState(metaId))

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file: any) => {
        file.text().then((fileData: any) => {
          try {
            backupSnapshot();
            const meta: MetaContent = JSON.parse(fileData);
            setPackages(meta?.packages || []);
            setClasses(meta?.classes || []);
            setRelations(meta?.relations || []);
            //setCodes(meta?.codes || []);
            setDiagrams(meta?.diagrams || []);
            setX6Nodes(meta?.x6Nodes || []);
            setX6Edges(meta?.x6Edges || []);

          } catch (error: any) {
            console.error(error);
            message.error("file illegal");
          }
        });
      });
    });
  }, [backupSnapshot, setPackages, setClasses, setRelations, setDiagrams, setX6Nodes, setX6Edges]);

  return doImport
}