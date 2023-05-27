import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { getTheFiles } from "shared/action/hooks/useOpenFile";
import { MetaContent } from "../meta";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, codesState, apisState, scriptLogicsState, graphLogicsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useImportModel(metaId: string) {
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

  const doImport = useCallback((meta: MetaContent) => {
    getTheFiles(".json").then((fileHandles) => {
      backupSnapshot();
      setPackages(meta?.packages || []);
      setClasses(meta?.classes || []);
      setRelations(meta?.relations || []);
      setScriptLogics(meta?.scriptLogics || []);
      setGraphLogics(meta?.graphLogics || []);
      setApis(meta.apis || []);
      setCodes(meta?.codes || []);
      setDiagrams(meta?.diagrams || []);
      setX6Nodes(meta?.x6Nodes || []);
      setX6Edges(meta?.x6Edges || []);
    });
  }, [backupSnapshot, setPackages, setClasses, setRelations, setScriptLogics, setGraphLogics, setApis, setCodes, setDiagrams, setX6Nodes, setX6Edges]);

  return doImport
}