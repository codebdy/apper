import { UmlEditor } from "UmlEditor"
import { memo } from "react"
import SaveActions from "./SaveActions"
import { useService } from "ServiceDesigner/contexts"
import { useQueryOneMeta } from "hooks/useQueryOneMeta"
import { AwesomeSpin } from "common/AwesomeSpin"
import { useShowError } from "AppDesigner/hooks/useShowError"

export const ServiceModel = memo(() => {
  const service = useService();
  const { meta, loading, error } = useQueryOneMeta(service?.metaId);

  useShowError(error)

  return (
    <AwesomeSpin spinning={loading}>
      <UmlEditor
        metaContent={meta?.content}
        options={{ supportCustomizedApi: true }}
        actions={<SaveActions metaId="" />}
      />
    </AwesomeSpin>
  )
})