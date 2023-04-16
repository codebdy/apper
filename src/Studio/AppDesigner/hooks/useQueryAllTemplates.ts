import { gql, useQuery } from "enthooks";
import { IUiFrame } from "model";
import { useMemo } from "react";

const templatesGql = gql`
query{
  templates{
    nodes{
      id 
      title 
      device 
      imageUrl
    }
    total
  }
}
`

export function useQueryAllTemplates() {
  const args = useMemo(() => {
    return {
      gql: templatesGql,
      depEntityNames: ["Template"],
    }
  }, [])
  return useQuery<IUiFrame>(args)
}