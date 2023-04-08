import { gql, useQuery } from "enthooks";
import { IService } from "model/service";
import { useMemo } from "react";

const serivcesGql = gql`
query {
  serivces{
    nodes{
      id
      name
      title
      imageUrl 
    }
    total
  }
}
`

export function useQueryServices() {
  const queryParams = useMemo(() => {
    return {
      gql: serivcesGql,
      depEntityNames: ["Service"]
    }
  }, [])
  const { data, error, loading } = useQuery<IService>(queryParams)

  return { serivces: data?.serivces?.nodes, error, loading }
}