import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { useShowError } from "designer/hooks/useShowError";
import { ID } from "shared";
import { useLazyQueryPageFrame } from "../hooks/useLazyQueryPageFrame";
import { SaveTemplateWidget } from "designer/UiDesigner/widgets/SaveTemplateWidget";
import { TemplateType } from "model";


export const FrameWorkSpace = (props: {
  frameId: ID
}) => {
  const { frameId } = props;

  const [query, { pageFrame, loading, error }] = useLazyQueryPageFrame();


  useEffect(() => {
    query(frameId)
  }, [frameId, query]);

  const { t } = useTranslation();

  useEffect(() => {
    // designer.setCurrentTree(
    //   transformToTreeNode(pageFrame?.schemaJson || {})
    // )
  }, [pageFrame?.schemaJson])

  useShowError(error);

  return (
    loading ?
      <Spin>
        <div style={{ width: "calc(100vw - 280px)", height: "calc(100vh - 64px)" }}>
        </div>
      </Spin>
      :
      <>
        FrameWorkSpace
      </>
  )
}
