import { memo } from "react"
import { useApp } from "../contexts";
import { useQueryOneMeta } from "hooks/useQueryOneMeta";
import { useShowError } from "hooks/useShowError";
import { AwesomeSpin } from "common/AwesomeSpin";

export const AppLogic = memo(() => {
  const app = useApp();
  const { meta, loading, error } = useQueryOneMeta(app?.metaId);
  useShowError(error)

  return (
    <AwesomeSpin spinning={loading}>
      <div>哈哈</div>
    </AwesomeSpin>
  )
})