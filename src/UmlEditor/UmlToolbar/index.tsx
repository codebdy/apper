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
import { DeleteOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons";
import { PRIMARY_COLOR } from "consts";
import { ModelToolbar } from "common/ModelBoard/ModelToolbar";
import { useMetaId } from "../hooks/useMetaId";
import styled from "styled-components";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";

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
      <Space>
        <ToolbarButton
          disabled={!selectedDiagram && !selectedLogicflow}
          onClick={toggleMinMap}
          style={{ marginRight: 16 }}
          type={minMap ? "default" : "text"}
          icon={<svg style={{ width: '18px', height: '18px', marginTop: "4px" }} viewBox="0 0 24 24">
            <path
              fill={minMap && selectedDiagram ? PRIMARY_COLOR : "currentColor"}
              d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z"
            />
          </svg>}
        >
        </ToolbarButton>
      </Space>
      {actions}
    </ModelToolbar>
  );
});
