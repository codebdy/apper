import { IDeleteOptions, useDeleteById } from "../enthooks/hooks/useDeleteById";
import { IService } from "../model";

export function useRemoveService(options?: IDeleteOptions<IService>) {
    return useDeleteById<IService>("Service", options)
}