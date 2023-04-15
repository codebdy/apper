
import { IMeta, IMetaInput } from 'model/meta';
import { IPostOptions, usePostOne } from '../enthooks/hooks/usePostOne';

export function useUpsertMeta(options?: IPostOptions<IMeta>) {
  return usePostOne<IMetaInput, IMeta>("Meta", options)
}