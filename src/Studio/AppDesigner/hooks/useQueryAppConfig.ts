import { gql, useQueryOne } from "enthooks";
import { IAppConfig } from "model";
import { useMemo } from "react";
import { ID } from "shared";

const configGql = gql`
query ($appId:ID){
  oneAppConfig(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }){
    id
    schemaJson
  }
}
`

export function useQueryAppConfig(appId: ID) {
  const input = useMemo(() => ({
    gql: configGql,
    params: { appId: appId || "" },
    depEntityNames: ["AppConfig"]
  }), [appId])

  const { data, error, loading } = useQueryOne<IAppConfig>(input)
  return { config: data?.oneAppConfig, error, loading }
}