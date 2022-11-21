import { Tabs } from "antd"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./style.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { ResourceWidget } from "../ResourceWidget";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "material/context";
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage";
const { TabPane } = Tabs;

export const MaterialWidget = observer((
  props: {
    withFrameMaterials?: boolean
  }
) => {
  const { withFrameMaterials } = props;
  const { debugMaterialTab, uploadedMaterialTabs } = useAppMaterialTabs();
  const { basicTab, frameworkTab } = usePredefinedMaterialTab();
  const p = useParseLangMessage();

  return (
    <div className="rx-material-panel">
      <MaterialSearchWidget />
      <Tabs defaultActiveKey={withFrameMaterials ? frameworkTab?.uuid : basicTab?.uuid}
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <MaterialDialog />
        }
      >
        {
          withFrameMaterials && frameworkTab &&
          <TabPane tab={frameworkTab.title} key={frameworkTab.uuid}>
            {
              frameworkTab.groups?.map((groupData, gIndex) => {
                return (<ResourceWidget
                  key={gIndex + 1}
                  title={groupData.title}
                  sources={groupData.materials.map(material => material.designer)}
                />)
              })
            }
          </TabPane>
        }
        {
          basicTab &&
          <TabPane tab={basicTab.title} key={basicTab.uuid}>
            {
              basicTab.groups?.map((groupData, gIndex) => {
                return (<ResourceWidget
                  key={gIndex + 1}
                  title={groupData.title}
                  sources={groupData.materials.map(material => material.designer)}
                />)
              })
            }
          </TabPane>
        }
        {
          uploadedMaterialTabs?.map((tab:any) => {
            return (
              <TabPane tab={p(tab.title)} key={tab.uuid}>
                {
                  tab.groups?.map((groupData:any, gIndex:number) => {
                    return (<ResourceWidget
                      key={gIndex + 1}
                      title={p(groupData.title)}
                      sources={groupData.materials.map((material:any) => material.designer)}
                    />)
                  })
                }
              </TabPane>
            )
          })
        }
        {
          debugMaterialTab &&
          <TabPane tab={debugMaterialTab.title} key={debugMaterialTab.uuid}>
            {
              debugMaterialTab.groups?.map((groupData: any, gIndex: any) => {
                return (<ResourceWidget
                  key={gIndex + 1}
                  title={groupData.title}
                  sources={groupData.materials.map((material: any) => material.designer)}
                />)
              })
            }
          </TabPane>
        }
      </Tabs>
    </div>
  )
})