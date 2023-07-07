import React, { memo, useCallback, useEffect, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelBoard } from "common/ModelBoard";
import { editorOptionsState, metaIdState, minMapState, selectedUmlDiagramState } from "./recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import styled from "styled-components";
import { MetaContent, MethodMeta } from "./meta";
import { useParesMeta } from "./hooks/useParesMeta";
import Editor from "@monaco-editor/react"
import { themeModeState } from "recoil/atoms";
import { useSelectedScriptLogic } from "./hooks/useSelectedScriptLogic";
import { useChangeScriptLogic } from "./hooks/useChangeScriptLogic";
import { useSelectedCode } from "./hooks/useSelectedCode";
import { useChangeCode } from "./hooks/useChangeCode";
import { LogicEditor } from "./LogicEditor";
import { useSelectedGraphLogic } from "./hooks/useSelectedGraphLogic";
import { useChangeGraphLogic } from "./hooks/useChangeGraphLogic";

const MapContianer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 3px;
  left: 3px;
  width: 140px;
  height: 110px;
  border-radius: 5px;
  overflow: hidden;
  .x6-widget-minimap{
    background-color: ${props => props.theme.token?.colorBgBase};
  }
  .x6-graph{
    box-shadow: none;
  }
`

export type UmlEditorOptions = {
  supportCustomizedApi?: boolean
}

export type UmlEditorProps = {
  actions?: React.ReactNode,
  metaContent: MetaContent | undefined,
  metaId: string | undefined,
  options?: UmlEditorOptions
}

export const UmlEditorInner = memo((
  props: UmlEditorProps
) => {
  const { actions, metaContent, metaId = "", options } = props;
  const [graph, setGraph] = useState<Graph>();
  const setMetaId = useSetRecoilState(metaIdState)
  const setEditorOptions = useSetRecoilState(editorOptionsState(metaId))
  useParesMeta(metaContent, metaId);
  const minMap = useRecoilValue(minMapState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedScript = useSelectedScriptLogic();
  const selectedGraphLogic = useSelectedGraphLogic();
  const selectedCode = useSelectedCode();
  const themeMode = useRecoilValue(themeModeState);
  const changeScript = useChangeScriptLogic(metaId);
  const changeGraphLogic = useChangeGraphLogic(metaId)
  const changeCode = useChangeCode(metaId);

  useEffect(() => {
    setMetaId(metaId)
  }, [metaId, setMetaId])

  useEffect(() => {
    setEditorOptions(options)
  }, [options, setEditorOptions, setMetaId])

  const handleScriptChange = useCallback((value?: string) => {
    selectedScript && changeScript({ ...selectedScript, logicScript: value })
  }, [changeScript, selectedScript])

  const handleCodeChange = useCallback((value?: string) => {
    selectedCode && changeCode({ ...selectedCode, scriptText: value })
  }, [selectedCode, changeCode])

  const handleLogicMetaChange = useCallback((methodMeta: MethodMeta) => {
    selectedGraphLogic && changeGraphLogic(methodMeta)
  }, [changeGraphLogic, selectedGraphLogic])

  return (
    <ModelBoard
      listWidth={260}
      modelList={<EntityTree graph={graph}></EntityTree>}
      toolbox={selectedDiagram && <Toolbox graph={graph}></Toolbox>}
      toolbar={<UmlToolbar actions={actions} />}
      propertyBox={<PropertyPanel />}
    >
      {
        selectedDiagram &&
        <div
          style={{
            display: "flex",
            flex: 1,
            flexFlow: "column",
            overflow: "auto"
          }}>
          <GraphCanvas
            graph={graph}
            onSetGraph={setGraph}
          ></GraphCanvas>
          <MapContianer
            className="model-minimap"
            style={{
              display: minMap ? "block" : "none"
            }}
            id="mini-map"
          ></MapContianer>
        </div>
      }
      {
        selectedScript && <Editor
          key={selectedScript.uuid}
          height="100%"
          language="javascript"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={selectedScript.logicScript || ""}
          onChange={handleScriptChange}
        />
      }

      {
        selectedCode && <Editor
          key={selectedCode.uuid}
          height="100%"
          language="javascript"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={selectedCode.scriptText || ""}
          onChange={handleCodeChange}
        />
      }
      {
        selectedGraphLogic &&
        <LogicEditor
          metaId={metaId}
          value={selectedGraphLogic}
          onChange={handleLogicMetaChange}
        />
      }
    </ModelBoard>
  );
});

UmlEditorInner.displayName = "UmlEditorInner";