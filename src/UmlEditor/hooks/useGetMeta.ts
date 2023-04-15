import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { SYSTEM_APP_ID } from "consts";
import { ID } from "shared";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { PackageStereoType } from "../meta";

export function useGetMeta(metaId: ID) {
  const packages = useRecoilValue(packagesState(metaId))
  const classes = useRecoilValue(classesState(metaId));
  const relations = useRecoilValue(relationsState(metaId));
  const diagrams = useRecoilValue(diagramsState(metaId));
  const x6Nodes = useRecoilValue(x6NodesState(metaId));
  const x6Edges = useRecoilValue(x6EdgesState(metaId));
  const getMeta = useCallback(() => {
    const pkgs = packages.filter(pgk => pgk.stereoType !== PackageStereoType.Service || metaId === SYSTEM_APP_ID)
    const clses = classes.filter(cls => pkgs.find(pkg => cls.packageUuid === pkg.uuid))
    const relns = relations.filter(relation => {
      const sourceClass = clses.find(cls => cls.uuid === relation.sourceId)
      return !!sourceClass
    })
    const diagms = diagrams.filter(diagram => pkgs.find(pkg => pkg.uuid === diagram.packageUuid))
    const content = {
      packages: pkgs,
      classes: clses,
      relations: relns,
      diagrams: diagms,
      x6Nodes,
      x6Edges,
    };

    return content;
  }, [metaId, classes, diagrams, packages, relations, x6Edges, x6Nodes]);

  return getMeta
}