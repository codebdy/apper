import { useMemo } from "react";
import dayjs from "dayjs";
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { useQueryOneMeta } from "./useQueryOneMeta";

export function usePublished() {
  const metaId = useMetaId()
  const { meta } = useQueryOneMeta(metaId)

  const published = useMemo(() => {
    if (!meta) {
      return true;
    }

    if (meta.publishedAt && (dayjs(meta?.updatedAt).diff(dayjs(meta?.publishedAt)) > 0)) {
      return false;
    }

    return true

  }, [meta])


  return published;
}