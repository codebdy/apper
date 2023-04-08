import { IPostOptions, usePostOne } from "enthooks";
import { IService, IServiceInput } from "model/service";


export function useUpsertApp(options?: IPostOptions<IService>) {
  return usePostOne<IServiceInput, IService>("Service", options)
}