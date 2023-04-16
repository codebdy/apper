import { useCallback } from "react";
import { IPostOptions, usePostOne } from "enthooks/hooks/usePostOne";
import { IClassAuthConfig, IClassAuthConfigInput } from "model";
import { useEdittingAppId } from "Studio/AppDesigner/hooks/useEdittingAppUuid";

export function useUpsertClassAuthConfig(options?: IPostOptions<any>): [
  (config: IClassAuthConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const appId = useEdittingAppId()
  const [post, { error, loading }] = usePostOne<IClassAuthConfigInput, IClassAuthConfig>("ClassAuthConfig",
    options
  )

  const upsert = useCallback((config: IClassAuthConfigInput) => {
    post({ ...config, app: { sync: { id: appId } } })
  }, [post, appId]);


  return [upsert, { error, loading }]
}