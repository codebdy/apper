import { useMemo } from "react";
import { ID } from "shared";
import { IService } from "model";
import { gql, useQueryOne } from "enthooks";

const serviceGql = gql`
query ($serviceId:ID!){
  oneService(where:{
    id:{
      _eq:$serviceId
    }
  }){
    id
    name
    title
    meta
    imageUrl
  }
}
`

export function useQueryOneService(id: ID) {
  const params = useMemo(() => ({
    serviceId: id 
  }), [id])
  
  const { data, error, loading } = useQueryOne<IService>(
    {
      gql: serviceGql,
      params,
      depEntityNames: ["Service"],
    }

  )

  return { service: data?.oneService, error, loading }
}