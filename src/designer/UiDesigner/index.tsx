import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  createDesigner,
  Shortcut,
  KeyCode,
} from 'designable/core'
import {
  NavigationWidget,
  ActionsWidget,
} from './widgets'
import { MaterialWidget } from './widgets/MaterialWidget'
import PageListWidget from './page/PageListWidget'
import { useTranslation } from 'react-i18next'
import PageWorkSpace from './page/PageWorkSpace'
import MenuComponentsWidget from './menu/MenuComponentsWidget'
import MenuWorkSpace from './menu/MenuWorkSpace'
import { MenuActionsWidget } from './menu/MenuActionsWidget'
import { useShowError } from 'designer/hooks/useShowError'
import { Button, Space, Spin } from 'antd'
import { useSelectedPageId } from './hooks/useSelectedPageId'
import MenuDragRoot from './menu/MenuDragRoot'
import { useDesignerParams, useDesignerViewKey } from 'plugin-sdk/contexts/desinger'
import { useQueryCagegories } from './hooks/useQueryCagegories'
import { useQueryPages } from './hooks/useQueryPages'
import { SettingOutlined } from '@ant-design/icons'
import { useBuildMeta } from 'datasource/hooks'
import { useSetRecoilState } from 'recoil'
import { categoriesState, pagesState } from './recoil/atom'
import ConfigWorkSpace from './config/ConfigWorkSpace'
import { ConfigActionsWidget } from './config/ConfigActionsWidget'
import { TemplateWidget } from './widgets/TemplateWidget'
import { useQueryTemplates } from './hooks/useQueryTemplates'
import { TemplateType } from 'model'
import { CompositePanel as CompositePanelDesignable, Designer, OutlineTreeWidget, StudioPanel } from 'designable/react'
import "../../designable/react/root"

const CompositePanel = CompositePanelDesignable as any
export enum DesignerRoutes {
  Templates = "Templates",
  Pages = "pages",
  Components = "coms",
  Entities = "entities",
  //Fragments = "fratments",
  OutlinedTree = "outlinedTree",
  Menu = "menu",
  Settings = "settings"
}

export const UiDesigner = memo(() => {
  const { app, device } = useDesignerParams();
  const key = useDesignerViewKey()
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const { t } = useTranslation();
  const setCategories = useSetRecoilState(categoriesState(key))
  const setPages = useSetRecoilState(pagesState(key))
  const pageId = useSelectedPageId();
  const { categories, loading, error } = useQueryCagegories();
  const { pages, loading: pagesLoading, error: pagesError } = useQueryPages();
  const { error: metaError, loading: metaLoading } = useBuildMeta();
  const { templates, loading: templateLoading, error: templateError } = useQueryTemplates(TemplateType.Page);

  useEffect(() => {
    setPages(pages || []);
  }, [pages, setPages])

  useEffect(() => {
    setCategories(categories || []);
  }, [categories, setCategories])

  useShowError(error || pagesError || metaError || templateError);

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

  const hanclePannelChange = useCallback((activeKey: string) => {
    setActiveKey(activeKey)
  }, []);

  const renderActions = useCallback(() => {
    if (activeKey === DesignerRoutes.Menu) {
      return <MenuActionsWidget />
    } else if (activeKey === DesignerRoutes.Settings) {
      return <ConfigActionsWidget />
    } else {
      return <ActionsWidget />
    }
  }, [activeKey])

  const handlePreview = useCallback(() => {
    window.open(`/${device}/${app?.uuid}`)
  }, [app?.uuid, device])

  return (
    <Spin style={{ height: "100vh" }} spinning={loading || pagesLoading || metaLoading || templateLoading}>
      <MenuDragRoot>
        <Designer engine={engine}>
          <StudioPanel logo={<NavigationWidget app={app} activeKey={activeKey as any} />}
            actions={
              <Space style={{ marginRight: 10 }}>
                <Button onClick={handlePreview}>{t("Designer.Preview")}</Button>
                {
                  renderActions()
                }
              </Space>
            }
          >
            <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange as any}>
              <CompositePanel.Item
                key={DesignerRoutes.Pages}
                title={t("Panels.Page")} icon="Page"
              >
                <PageListWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Components}
                title={t("Panels.Component")}
                icon="Component"
              >
                <MaterialWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Entities}
                title={t("Panels.Entities")}
                icon={
                  <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 998 998" version="1.1">
                    <path d="M513.89 950.72c-5.5 0-11-1.4-15.99-4.2L143.84 743c-9.85-5.73-15.99-16.17-15.99-27.64V308.58c0-11.33 6.14-21.91 15.99-27.64L497.9 77.43c9.85-5.73 22.14-5.73 31.99 0l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64V715.5c0 11.33-6.14 21.91-15.99 27.64L529.89 946.52c-4.99 2.8-10.49 4.2-16 4.2zM191.83 697.15L513.89 882.2l322.07-185.05V326.92L513.89 141.87 191.83 326.92v370.23z m322.06-153.34c-5.37 0-10.88-1.4-15.99-4.33L244.29 393.91c-15.35-8.79-20.6-28.27-11.77-43.56 8.83-15.28 28.41-20.5 43.76-11.72l253.61 145.7c15.35 8.79 20.6 28.27 11.77 43.56-6.01 10.32-16.76 15.92-27.77 15.92z m0 291.52c-17.66 0-31.99-14.26-31.99-31.84V530.44L244.55 393.91s-0.13 0-0.13-0.13l-100.45-57.69c-15.35-8.79-20.6-28.27-11.77-43.56s28.41-20.5 43.76-11.72l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64v291.39c-0.13 17.71-14.46 31.97-32.12 31.97z m0 115.39c-17.66 0-31.99-14.26-31.99-31.84V511.97c0-17.58 14.33-31.84 31.99-31.84s31.99 14.26 31.99 31.84v406.91c0 17.7-14.33 31.84-31.99 31.84z m0-406.91c-11 0-21.75-5.73-27.77-15.92-8.83-15.28-3.58-34.64 11.77-43.56l354.06-203.52c15.35-8.79 34.8-3.57 43.76 11.72 8.83 15.28 3.58 34.64-11.77 43.56L529.89 539.61c-4.99 2.93-10.49 4.2-16 4.2z"></path>
                  </svg>
                }
              >
                <MaterialWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Templates}
                title={t("Panels.Templates")}
                icon={
                  <svg className='nav-icon' viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z" />
                  </svg>
                }
              >
                <TemplateWidget templates={templates || []} templateType={TemplateType.Page} />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.OutlinedTree}
                title={t("Panels.OutlinedTree")} icon="Outline"
              >
                <OutlineTreeWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Menu}
                title={t("Panels.Menu")}
                icon={
                  <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                    <path d="M912.051527 151.150632l-286.624817 780.499041c-5.753719 15.667798-23.118384 23.704707-38.786182 17.950989a30.220937 30.220937 0 0 1-19.305944-22.909364L498.23787 550.442426a30.220937 30.220937 0 0 0-24.265655-24.265655L97.723343 457.080057c-16.415729-3.014425-27.279412-18.766366-24.264987-35.182094a30.220937 30.220937 0 0 1 19.306612-22.910032L873.263342 112.363782c15.669134-5.753719 33.033799 2.28319 38.786849 17.951656a30.220937 30.220937 0 0 1 0 20.835194zM826.833582 205.907791a7.555234 7.555234 0 0 0-9.679684-9.650301l-573.559491 207.092476a7.555234 7.555234 0 0 0 1.149942 14.527205l297.554613 56.790594a7.555234 7.555234 0 0 1 6.020837 6.087616L603.515031 788.626754a7.555234 7.555234 0 0 0 14.549911 1.210044L826.83425 205.908459z" p-id="8853"></path>
                  </svg>
                }>
                <MenuComponentsWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Settings}
                title={t("Panels.Settings")}
                icon={<SettingOutlined />}>
              </CompositePanel.Item>
            </CompositePanel>
            {
              pageId && <PageWorkSpace pageId={pageId} visable={
                activeKey === DesignerRoutes.Pages ||
                activeKey === DesignerRoutes.OutlinedTree ||
                activeKey === DesignerRoutes.Components ||
                activeKey === DesignerRoutes.Templates
              } />
            }

            {
              activeKey === DesignerRoutes.Menu &&
              <MenuWorkSpace app={app} />
            }
            {
              activeKey === DesignerRoutes.Settings &&
              <ConfigWorkSpace />
            }
          </StudioPanel>
        </Designer >
      </MenuDragRoot>
    </Spin>
  )
})




