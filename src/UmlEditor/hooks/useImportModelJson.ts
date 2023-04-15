import { message } from "antd";
import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SYSTEM_APP_ID } from "consts";
import { getTheFiles } from "shared/action/hooks/useOpenFile";
import { MetaContent, PackageStereoType } from "../meta";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useImportModelJson(metaId: string) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const [classes, setClasses] = useRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  //const setCodes = useSetRecoilState(codesState(metaId));
  const setX6Nodes = useSetRecoilState(x6NodesState(metaId));
  const setX6Edges = useSetRecoilState(x6EdgesState(metaId));
  const [packages, setPackages] = useRecoilState(packagesState(metaId))

  const doImport = useCallback(() => {
    getTheFiles(".json").then((fileHandles) => {
      fileHandles?.[0]?.getFile().then((file: any) => {
        file.text().then((fileData: any) => {
          try {
            backupSnapshot();
            const meta: MetaContent = JSON.parse(fileData);
            const getPackage = (packageUuid: string) => {
              return packages?.find(pkg => pkg.uuid === packageUuid);
            }

            const systemPackages = metaId === SYSTEM_APP_ID ? [] : packages?.filter(pkg => pkg.stereoType === PackageStereoType.Service) || [];
            const systemClasses = metaId === SYSTEM_APP_ID ? [] : classes?.filter(cls => getPackage(cls.packageUuid)?.stereoType === PackageStereoType.Service) || []
            setPackages([...systemPackages, ...meta?.packages || []]);
            setClasses([...systemClasses, ...meta?.classes || []]);
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
  }, [backupSnapshot, metaId, packages, classes, setPackages, setClasses, setRelations, setDiagrams, setX6Nodes, setX6Edges]);

  return doImport
}