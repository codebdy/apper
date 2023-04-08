import { gql, useQuery } from "enthooks";
import { IService } from "model/service";
import { useMemo } from "react";

const servicesGql = gql`
query {
  services{
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
      gql: servicesGql,
      depEntityNames: ["Service"]
    }
  }, [])
  const { data, error, loading } = useQuery<IService>(queryParams)

  return { services: data?.services?.nodes, error, loading }
}