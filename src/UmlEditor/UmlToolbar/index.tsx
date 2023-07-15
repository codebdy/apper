import React, { memo, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  minMapState,
  redoListState,
  selectedUmlDiagramState,
  selectedElementState,
  undoListState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useAttribute } from "../hooks/useAttribute";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";
import { CONST_ID } from "../meta/Meta";
import { Button, Divider, Space } from "antd";
import { DeleteOutlined, FunctionOutlined, RedoOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { ModelToolbar } from "common/ModelBoard/ModelToolbar";
import { useMetaId } from "../hooks/useMetaId";
import styled from "styled-components";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";
import { mapIcon, zoomResetIcon } from "./icons";
import { MIN_ZOOM, MAX_ZOOM, useZoom, useZoomIn, useZoomOut } from "@rxdrag/minions-logicflow-editor";

const ToolbarButton = styled((props) => <Button type="text" {...props} />)`
`

export const UmlToolbar = memo((
  props: {
    actions?: React.ReactNode
  }
) => {
  const { actions } = props;
  const metaId = useMetaId();
  const undoList = useRecoilValue(undoListState(metaId));
  const redoList = useRecoilValue(redoListState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedLogicflow = useSelectedGraphLogic();

  const { attribute } = useAttribute(selectedElement || "", metaId);
  const undo = useUndo(metaId);
  const redo = useRedo(metaId);
  const deleteSelectedElement = useDeleteSelectedElement(metaId);
  const [minMap, setMinMap] = useRecoilState(minMapState(metaId));
  const { zoom, setZoom } = useZoom()
  const zoomIn = useZoomIn()
  const zoomOut = useZoomOut()

  console.log("哈哈", zoom, setZoom)

  const handleZoomReset = useCallback(() => {
    setZoom(1)
  }, [setZoom])

  const toggleMinMap = useCallback(() => {
    setMinMap((a) => !a);
  }, [setMinMap]);

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = () => {
    redo();
  };

  const handleDelete = useCallback(() => {
    deleteSelectedElement();
  }, [deleteSelectedElement]);


  return (
    <ModelToolbar>
      <Space>
        <ToolbarButton
          icon={<UndoOutlined />}
          disabled={undoList.length === 0}
          onClick={handleUndo}
        >
        </ToolbarButton>
        <ToolbarButton
          icon={<RedoOutlined />}
          disabled={redoList.length === 0}
          onClick={handleRedo}
        >
        </ToolbarButton>
        <Divider type="vertical" />
        <ToolbarButton
          disabled={
            (attribute && attribute.name === CONST_ID) || !selectedElement
          }
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
        </ToolbarButton>
      </Space>
      <div style={{ flex: 1 }} />
      <Space
        style={{ marginRight: 16 }}
      >
        <ToolbarButton
          disabled={!selectedDiagram && !selectedLogicflow}
          onClick={toggleMinMap}

          type={minMap ? "default" : "text"}
          icon={mapIcon}
        >
        </ToolbarButton>
        <ToolbarButton
          icon={zoomResetIcon}
          disabled={zoom === 1}
          onClick={handleZoomReset}
        ></ToolbarButton>
        <ToolbarButton
          icon={<ZoomOutOutlined />}
          disabled={zoom === MIN_ZOOM}
          onClick={zoomOut}
        ></ToolbarButton>
        <ToolbarButton
          icon={<ZoomInOutlined />}
          disabled={zoom === MAX_ZOOM}
          onClick={zoomIn}
        ></ToolbarButton>

        <ToolbarButton
          icon={<FunctionOutlined />}
        ></ToolbarButton>
      </Space>
      {actions}
    </ModelToolbar>
  );
});
