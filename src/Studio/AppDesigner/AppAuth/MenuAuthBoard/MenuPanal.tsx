import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IMenu, IMenuAuthConfig } from "model";
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "shared";
import { IUiAuthRow } from "../IUiAuthConfig";
import { IMenuItem, MenuItemType, useParseLangMessage } from "plugin-sdk";
import { IDevice } from "Studio/AppDesigner/hooks/useDevices";

export const MenuPanal = memo((
  props: {
    device: IDevice,
    menu: IMenu,
    roleId: ID,
    menuConfigs: IMenuAuthConfig[],
  }
) => {
  const { device, menu, roleId, menuConfigs } = props;
  const columns = useColumns(roleId);
  const p = useParseLangMessage();

  const makeItem = useCallback((item: IMenuItem): any => {
    const menuItemConfig = menuConfigs?.find(config => config.roleId === roleId && config.menuItemUuid === item.uuid);
    return {
      key: item.uuid,
      menuItemUuid: item.uuid,
      name: p(item.title),
      children: (item.type === MenuItemType.Group && !menuItemConfig?.refused)
        ? item.children?.map(itm => makeItem(itm))
        : undefined,
      menuConfig: menuItemConfig,
      device: device.key
    }
  }, [p, menuConfigs, roleId, device])

  const data: IUiAuthRow[] = useMemo(() => {
    return menu?.schemaJson?.items.map(item => makeItem(item)) || []
  }, [menu, makeItem])

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={false}
    />
  )
})