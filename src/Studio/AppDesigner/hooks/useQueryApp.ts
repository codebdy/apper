import { gql, useQueryOne } from "enthooks";
import { IApp } from "model";
import { useMemo } from "react";
import { ID } from "shared";

const appGql = gql`
query ($appId:ID!){
  oneApp(where:{
    id:{
      _eq:$appId
    }
  }){
    id
    name
    title
    metaId
  }
}
`

export function useQueryApp(id: ID) {
  const params = useMemo(() => ({
    appId: id || ""
  }), [id])
  
  const { data, error, loading } = useQueryOne<IApp>(
    {
      gql: appGql,
      params,
      depEntityNames: ["App"],
    }

  )

  return { app: data?.oneApp, error, loading }
}