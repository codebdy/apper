import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../recoil/atoms";
import { ID } from "shared";
import { MetaContent } from "../meta";

export function useParesMeta(meta: MetaContent, metaId: ID) {
  const setClasses = useSetRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const setX6Nodes = useSetRecoilState(x6NodesState(metaId));
  const setX6Edges = useSetRecoilState(x6EdgesState(metaId));
  const setPackages = useSetRecoilState(packagesState(metaId))


  useEffect(() => {
    if (meta) {
      setPackages(meta?.packages || []);
      setClasses(meta?.classes || []);
      setRelations(meta?.relations || []);
      setDiagrams(meta?.diagrams || []);
      setX6Nodes(meta?.x6Nodes || []);
      setX6Edges(meta?.x6Edges || []);
    }
  }, [setDiagrams, setClasses, setPackages, setRelations, setX6Edges, setX6Nodes, meta]);

}
