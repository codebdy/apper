import { useMemo } from "react";
import { ID } from "shared";
import { gql, useQueryOne } from "enthooks";
import { IMeta } from "model/meta";

const metaGql = gql`
query ($metaId:ID!){
  oneMeta(where:{
    id:{
      _eq:$metaId
    }
  }){
    id
    name
    content
    publishedAt
    updatedAt
    createdAt
  }
}
`

export function useQueryOneMeta(id?: ID) {
  const params = useMemo(() => ({
    metaId: id 
  }), [id])
  
  const { data, error, loading } = useQueryOne<IMeta>(
    {
      gql: id ? metaGql : undefined,
      params,
      depEntityNames: ["Meta"],
    }

  )

  return { meta: data?.oneMeta, error, loading }
}