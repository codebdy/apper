import { gql, useQueryOne } from "enthooks";
import { IPage } from "model";
import { useMemo } from "react";

const pageGql = gql`
query ($id:ID!){
  onePage(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    schemaJson
  }
}
`

export function useQueryPage(id?: string) {
  const input = useMemo(() => (
    {
      gql: id && pageGql,
      params: { id },
      depEntityNames: ["Page"]
    }
  ), [id]);

  const { data, error, loading } = useQueryOne<IPage>(input);

  return { page: data?.onePage, error, loading }
}