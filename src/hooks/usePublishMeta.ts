import { gql } from "enthooks";
import { useCallback } from "react";
import { RequestOptions, useLazyRequest } from "enthooks/hooks/useLazyRequest";
import { ID } from "shared";

const publishGql = gql`
  mutation publishMeta($metaId:ID!) {
    publishMeta (metaId:$metaId)
  }
`;

export function usePublishMeta(
  metaId: ID,
  options?: RequestOptions<boolean>
): [
    () => void,
    { loading: boolean | undefined; error: Error | undefined }
  ] {

  const [doPublish, { loading, error }] = useLazyRequest(options)

  const publish = useCallback(() => {
    doPublish(publishGql, { metaId })
  }, [metaId, doPublish]);

  return [publish, { loading, error }];
}
