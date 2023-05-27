import { UmlEditor } from "UmlEditor"
import { memo } from "react"
import SaveActions from "./SaveActions"
import { useApp } from "../contexts";
import { useQueryOneMeta } from "hooks/useQueryOneMeta";
import { useShowError } from "hooks/useShowError";
import { AwesomeSpin } from "common/AwesomeSpin";

export const AppModel = memo(() => {
  const app = useApp();
  const { meta, loading, error } = useQueryOneMeta(app?.metaId);
  useShowError(error)

  return (
    <AwesomeSpin spinning={loading}>
      <UmlEditor
        metaContent={meta?.content}
        metaId={meta?.id}
        actions={<SaveActions meta = {meta}/>}
      />
    </AwesomeSpin>
  )
})