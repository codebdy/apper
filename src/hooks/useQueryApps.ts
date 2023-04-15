import { gql, useQuery } from "enthooks";
import { IApp } from "model";
import { useMemo } from "react";

const appsGql = gql`
query {
  apps{
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

export function useQueryApps() {
  const queryParams = useMemo(() => {
    return {
      gql: appsGql,
      depEntityNames: ["App"]
    }
  }, [])
  const { data, error, loading } = useQuery<IApp>(queryParams)

  return { apps: data?.apps?.nodes, error, loading }
}