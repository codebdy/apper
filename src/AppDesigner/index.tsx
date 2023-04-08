import { memo } from "react"
import { Outlet } from "react-router-dom";
import { useQueryApp } from "./hooks/useQueryApp";
import AppDesignerRoot from "./AppDesignerRoot";
import { useEdittingAppId } from "./hooks/useEdittingAppUuid";
import { useShowError } from "./hooks/useShowError";

const AppDesigner = memo(() => {
  const appId = useEdittingAppId();
  const { app, error } = useQueryApp(appId)

  useShowError(error);

  return (
    app ?
      <AppDesignerRoot app={app}>
        <Outlet />
      </AppDesignerRoot>
      : <></>
  )
})

export default AppDesigner;