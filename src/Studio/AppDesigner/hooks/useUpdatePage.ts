import { IPostOptions, usePostOne } from "enthooks";
import { IPageInput, IPage } from "model";
import { useCallback } from "react";


export function useUpdatePage(options?: IPostOptions<any>): [
  (page: IPageInput) => void,
  { loading?: boolean; error?: Error }
] {
  const [post, { error, loading }] = usePostOne<IPageInput, IPage>("Page",
    {
      ...options,
      fieldsGql: "id title schemaJson"
    }
  )

  const update = useCallback((page: IPageInput) => {
    post({
      ...page,
    })
  }, [post]);

  return [update, { error: error, loading: loading }]
}