import { createDesigner, KeyCode, Shortcut } from "@designable/core"
import { Spin } from "antd"
import { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useShowError } from "designer/hooks/useShowError"
import { ID } from "shared"
import { FrameListWidget } from "./FrameListWidget"
import { FrameWorkSpace } from "./FrameWorkSpace"
import { useQueryPageFrames } from "./hooks/useQueryPageFrames"
import { DesignerRoutes } from "../UiDesigner"
import { useBuildMeta } from "datasource"
import { useQueryTemplates } from "../UiDesigner/hooks/useQueryTemplates"
import { TemplateType } from "model"

export const FrameDesigner = memo(() => {
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const [selectedId, setSeletedId] = useState<ID>();
  const { t } = useTranslation();
  const { pageFrames, error, loading } = useQueryPageFrames();
  const { error: metaError, loading: metaLoading } = useBuildMeta();
  const { templates, loading: templateLoading, error: templateError } = useQueryTemplates(TemplateType.Frame);

  useShowError(error || metaError || templateError);
  const hanclePannelChange = useCallback((activeKey?: any) => {
    setActiveKey(activeKey)
  }, []);

  const engine = useMemo(
    () => createDesigner({
      shortcuts: [
        new Shortcut({
          codes: [
            [KeyCode.Meta, KeyCode.S],
            [KeyCode.Control, KeyCode.S],
          ],
          handler(ctx) {
            //saveSchema(ctx.engine)
          },
        }),
      ],
      rootComponentName: 'Form',
    }),
    []
  )

  const handleSelect = useCallback((selectedId?: ID) => {
    setSeletedId(selectedId)
  }, [])
  return (
    <Spin spinning={loading || metaLoading || templateLoading}>
      <FrameListWidget
        templates={pageFrames || []}
        selectedId={selectedId}
        onSelected={handleSelect}
      />
      {
        selectedId && <FrameWorkSpace frameId={selectedId} />
      }

    </Spin>
  )
})
