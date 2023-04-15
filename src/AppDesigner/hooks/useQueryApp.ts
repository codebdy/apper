import { gql } from "../../enthooks";
import { useMemo } from "react";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { IApp } from "../../model";
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