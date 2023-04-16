import { Spin } from 'antd'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DesignerContext } from 'plugin-sdk/contexts/desinger'
import { Device } from '@rxdrag/appx-plugin-sdk'
import { IApp, } from 'model'
export const DesignerRootInner = memo((
  props: {
    app: IApp,
    children: React.ReactNode
  }
) => {
  const { app } = props;
  const { device = Device.PC } = useParams();
  //const me = useMe();
  //const appId = app.id;
  //const { config, loading: configLoading, error: configError } = useQueryAppConfig(appId);
  //const { deviceConfig, loading: deviceLoading, error: deviceError } = useQueryAppDeviceConfig(appId, device as any)
  //const { langLocales, loading: localLoading, error: localError } = useQueryLangLocales(appId);
  //const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(appId, device as any, me?.id)
  //const { materialConfig, loading: materialConfigLoading, error: materialConfigError } = useQueryMaterialConfig(appId, device as any)
  //const { plugins, loading: pluginLoading, error: pluginError } = useIntalledPlugins(appId);
  //useShowError(configError || deviceError || materialConfigError);

  // const debugPlugins = useMemo(
  //   () => plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.debug) || [],
  //   [plugins]);

  const contextValue = useMemo(() => {
    return {
      app: app,
      device: device as Device,
      config: undefined,
      langLocales: undefined,
      deviceConfig: undefined,
      //userConfig,
      // uploadedPlugins: plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.uploaded) || [],
      // debugPlugins: debugPlugins,
      //materialConfig
    }
  }, [device, app])


  return (
    app ?
      <DesignerContext.Provider
        value={contextValue}
      >
        <Spin
          style={{ height: "100vh" }}
          spinning={
            false
            // configLoading ||
            // localLoading ||
            // deviceLoading ||
            // materialConfigLoading
          }
        >
          {props.children}
        </Spin>
      </DesignerContext.Provider>
      : <></>
  )
})



