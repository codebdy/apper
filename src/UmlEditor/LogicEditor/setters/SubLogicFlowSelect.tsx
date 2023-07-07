import { useSubLogicFlows } from "UmlEditor/hooks/useSubLogicFlows";
import { metaIdState } from "UmlEditor/recoil/atoms";
import { Form, Select } from "antd";
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

export const SubLogicFlowSelect = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void
  }
) => {
  const { value, onChange } = props
  const { t } = useTranslation();
  const metaId = useRecoilValue(metaIdState);

  const subFlows = useSubLogicFlows(metaId || "")

  const hanldeSubFlowChange = useCallback((subFlowId: string) => {
    onChange?.(subFlowId)
  }, [onChange])

  return (
    <Form.Item
      label={t("UmlEditor.SubGraphs")}
    >
      <Select
        value={value}
        options={subFlows?.map((subFlow) => ({ value: subFlow.uuid, label: subFlow.name }))}
        onChange={hanldeSubFlowChange}
      />
    </Form.Item>
  )
})