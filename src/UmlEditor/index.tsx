import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelBoard } from "common/ModelBoard";
import { minMapState, selectedUmlDiagramState } from "./recoil/atoms";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import styled from "styled-components";
import { MetaContent } from "./meta";
import { useParesMeta } from "./hooks/useParesMeta";

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

const UmlEditor = memo((
  props: {
    actions?: React.ReactNode,
    meta?: MetaContent,
    metaId?: string,
  }
) => {
  const {actions, meta = {}, metaId =""} = props;
  const [graph, setGraph] = useState<Graph>();
  useParesMeta(meta, metaId);
  const minMap = useRecoilValue(minMapState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));

  return (
    <RecoilRoot>
      <ModelBoard
        listWidth={260}
        modelList={<EntityTree graph={graph}></EntityTree>}
        toolbox={selectedDiagram && <Toolbox graph={graph}></Toolbox>}
        toolbar={<UmlToolbar actions = {actions}/>}
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
      </ModelBoard>
    </RecoilRoot>
  );
});

export default UmlEditor;