import { gql } from "enthooks";
import { useQuery } from "enthooks/hooks/useQuery";
import { useMemo } from "react";
import { IPageCategory } from "model";
import { useEdittingAppId } from "Studio/AppDesigner/hooks/useEdittingAppUuid";

const categoriesGql = gql`
query ($appId:ID!){
  pageCategories(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  },
  orderBy:{
    id:asc
  }
 ){
    nodes{
      id
      device
      title
      uuid    
    }
  }
}
`

export function useQueryAppPageCagegories() {
  const appId = useEdittingAppId()

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { appId },
      depEntityNames: ["PageCategory"]
    }
  }, [appId])
  const { data, error, loading } = useQuery<IPageCategory>(args)

  return { categories: data?.pageCategories?.nodes, error, loading }
}