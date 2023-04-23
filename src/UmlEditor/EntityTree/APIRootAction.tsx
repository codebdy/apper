import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo, useState } from "react"
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useTranslation } from "react-i18next";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { PackageMeta } from "../meta/PackageMeta";
import { useMetaId } from "../hooks/useMetaId";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

export const APIRootAction = memo(() => {
  const metaId = useMetaId();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const setPackages = useSetRecoilState(packagesState(metaId));
  const backup = useBackupSnapshot(metaId);
  const { t } = useTranslation();

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])


  const handleClose = useCallback(() => {
    setNewPackage(undefined);
  }, [])

  const handleConfirm = useCallback((pkg: PackageMeta) => {
    backup();
    setPackages(packages => [...packages, pkg]);
    setNewPackage(undefined);
  }, [backup, setPackages])

  const items: MenuItemType[] = useMemo(() => (
    [
      {
        label: t("UmlEditor.AddQuery"),
        key: '0',
        onClick: e => {
          e.domEvent.stopPropagation();
          //handleAddPackage();
        }
      },
      {
        label: t("UmlEditor.AddMutation"),
        key: '1',
        //onClick: expotJson
      },
    ]
  ), [t]);

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
          <MoreOutlined />
        </Button>
      </Dropdown>
      {
        newPackage &&
        <PackageDialog
          pkg={newPackage}
          open={!!newPackage}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }

    </>
  )
})