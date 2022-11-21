import { Menu } from "antd";
import { IMenuItem, MenuItemType } from "plugin-sdk/model/IMenuNode";
import  { memo, useCallback, useMemo } from "react";
import { IconView } from "plugin-sdk/icon/IconView";
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItem } from "./hooks/useGetMenuItem";
import { useEntryPageUuid } from "./hooks/useEntryPageUuid";
import { useGetMenuItemByPageUuid } from "./hooks/useGetMenuItemByPageUuid";
import "./style.less"
import cls from "classnames";
import { useMenu } from "runner/hooks/useMenu";
import { SYSTEM_APP_ID } from "consts";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { useCheckMenuAuth } from "./hooks/useCheckMenuAuth";
import { ItemType } from "antd/es/menu/hooks/useItems";

export interface IComponentProps {
  mode?: "vertical" | "horizontal" | "inline",
  className?: string,
}

const AppMenu = memo((props: IComponentProps) => {
  const { className, ...other } = props;
  const menu = useMenu()
  const p = useParseLangMessage();
  const { device = Device.PC, appId = SYSTEM_APP_ID, menuUuid } = useParams();
  const navigate = useNavigate();

  const entryId = useEntryPageUuid();

  const getMenuItem = useGetMenuItem();
  const getMenuItemByPageId = useGetMenuItemByPageUuid();
  const checkAuth = useCheckMenuAuth();

  const makeItem = useCallback((item: IMenuItem): any => {
    const children = item.children?.filter(item => checkAuth(item))
    return ({
      key: item.uuid,
      icon: <IconView icon={item.icon} />,
      label: p(item.title),
      children: !children?.length
        ? undefined
        : children?.map((child) => makeItem(child)),
      type: item.type === MenuItemType.Divider ? "divider" : undefined
    })
  }, [checkAuth, p]);

  const data: ItemType[] = useMemo(() => {
    const rtValue = [];
    for (const item of menu?.schemaJson?.items?.filter((item: any) => checkAuth(item)) || []) {
      rtValue.push(makeItem(item))
    }
    return rtValue
  }, [checkAuth, makeItem, menu?.schemaJson?.items]);

  const handleClick = useCallback(({ key }: any) => {
    const item = getMenuItem(key);

    if (item?.type === MenuItemType.Link) {
      item?.link && window.open(item?.link)
    } else if (item?.type !== MenuItemType.Divider) {
      navigate(`/${device}/${appId}/${item?.uuid}`)
    }
  }, [appId, device, getMenuItem, navigate]);

  return (
    <>
      <Menu
        className={cls("app-menu", className)}
        {...other}
        selectedKeys={[(menuUuid !== "no" && menuUuid) || getMenuItemByPageId(entryId)?.uuid] as any}
        items={data}
        onClick={handleClick}
      />
    </>
  )
})

export default AppMenu;