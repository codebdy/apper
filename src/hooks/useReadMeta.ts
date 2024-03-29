import { gql, GraphQLRequestError } from "enthooks";
import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useQueryOne } from "enthooks/hooks/useQueryOne";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState } from "../UmlEditor/recoil/atoms";
import { IApp } from "model";
import { ID } from "shared";

const queryGql = gql`
query ($appId:ID!) {
  oneApp(
    where:{
        id:{
        _eq:$appId
      }
    }
  ){
    id
    meta
    publishedMeta
  }
}
`

export function useReadMeta(appId: ID): { error?: GraphQLRequestError; loading?: boolean } {
  const setClasses = useSetRecoilState(classesState(appId));
  const setRelations = useSetRecoilState(relationsState(appId));
  const setDiagrams = useSetRecoilState(diagramsState(appId));
  const setX6Nodes = useSetRecoilState(x6NodesState(appId));
  const setX6Edges = useSetRecoilState(x6EdgesState(appId));
  const setPackages = useSetRecoilState(packagesState(appId))

  const input = useMemo(() => ({
    gql: queryGql,
    params: { appId }
  }), [appId])

  const { data, error, loading } = useQueryOne<IApp>(input);

  // const systemInput = useMemo(() => (
  //   {
  //     gql: appId !== SYSTEM_APP_ID ? queryGql : undefined,
  //     params: { appId: SYSTEM_APP_ID }
  //   }
  // ), [appId])
  // const { data: systemData, error: systemError, loading: systemLoading } = useQueryOne<IApp>(systemInput);

  useEffect(() => {
    // if (data && (systemData || appId === SYSTEM_APP_ID)) {
    //   const meta = data.oneApp?.meta
    //   const systemMeta = systemData?.oneApp?.publishedMeta;
    //   const getPackage = (packageUuid: string) => {
    //     return systemMeta?.packages?.find(pkg => pkg.uuid === packageUuid);
    //   }
      // const systemPackages = systemMeta?.packages?.filter(pkg => pkg.stereoType === PackageStereoType.Service) || [];
      // const systemClasses = systemMeta?.classes?.filter(cls => getPackage(cls.packageUuid)?.stereoType === PackageStereoType.Service) || []
      // setPackages([...systemPackages, ...meta?.packages || []]);
      // setClasses([...systemClasses, ...meta?.classes || []]);
    //   setRelations(meta?.relations || []);
    //   setDiagrams(meta?.diagrams || []);
    //   setX6Nodes(meta?.x6Nodes || []);
    //   setX6Edges(meta?.x6Edges || []);
    // }
  }, [data, setDiagrams, setClasses, setPackages, setRelations, setX6Edges, setX6Nodes, appId]);

  return { error: error , loading: loading };
}
