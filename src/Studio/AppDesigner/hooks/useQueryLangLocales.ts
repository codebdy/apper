import { gql, useQuery } from "enthooks"
import { ILangLocal } from "model"
import { useMemo } from "react"

const langLocalGql = gql`
query ($appId:ID!){
  langLocals(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }){
    nodes{
      id
      name
      schemaJson      
    }
  }
}
`

export function useQueryLangLocales(appId: string) {
  const input = useMemo(() => ({
    gql: langLocalGql,
    params: { appId: appId || "" },
    depEntityNames: ["LangLocal"]
  }), [appId])
  const { data, error, loading } = useQuery<ILangLocal>(input)
  return { langLocales: data?.langLocals?.nodes, error, loading }
}