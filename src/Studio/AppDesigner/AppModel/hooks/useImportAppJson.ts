import { useBackupSnapshot } from "UmlEditor/hooks/useBackupSnapshot";
import { relationsState, scriptLogicsState, graphLogicsState, codesState, apisState, diagramsState, x6NodesState, x6EdgesState } from "UmlEditor/recoil/atoms";
import { message } from "antd";
import { classesState, packagesState } from "datasource";
import { getTheFiles } from "hooks/useAppOpenFile";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { IAppJson } from "../interfaces";

export function useImportAppJson(metaId: string) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setClasses = useSetRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setScriptLogics = useSetRecoilState(scriptLogicsState(metaId));
  const setGraphLogics = useSetRecoilState(graphLogicsState(metaId));
  const setCodes = useSetRecoilState(codesState(metaId));
  const setApis = useSetRecoilState(apisState(metaId));
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
            const appJson: IAppJson = JSON.parse(fileData);
            const meta = appJson.meta?.content
            setPackages(meta?.packages || []);
            setClasses(meta?.classes || []);
            setRelations(meta?.relations || []);
            setScriptLogics(meta?.scriptLogics || []);
            setGraphLogics(meta?.graphLogics || []);
            setApis(meta?.apis || []);
            setCodes(meta?.codes || []);
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
  }, [backupSnapshot, setPackages, setClasses, setRelations, setScriptLogics, setGraphLogics, setApis, setCodes, setDiagrams, setX6Nodes, setX6Edges]);

  return doImport
}