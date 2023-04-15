import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo, useState } from "react"
import { useCreateNewPackage } from '../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useExportModelJson } from "../hooks/useExportModelJson";
import { useTranslation } from "react-i18next";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { PackageMeta } from "../meta/PackageMeta";
import { useImportModelJson } from "../hooks/useImportModelJson";
import { useMetaId } from "../hooks/useMetaId";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

export const ModelRootAction = memo(() => {
  const metaId = useMetaId();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const setPackages = useSetRecoilState(packagesState(metaId));
  const createNewPackage = useCreateNewPackage(metaId);
  const backup = useBackupSnapshot(metaId);
  const expotJson = useExportModelJson(metaId);
  const importJson = useImportModelJson(metaId);
  const { t } = useTranslation();

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleAddPackage = useCallback(
    () => {
      setNewPackage(createNewPackage());
    },
    [createNewPackage],
  );

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
        icon: <FolderAddOutlined />,
        label: t("UmlEditor.AddPackage"),
        key: '0',
        onClick: e => {
          e.domEvent.stopPropagation();
          handleAddPackage();
        }
      },
      {
        icon: <DownloadOutlined />,
        label: t("UmlEditor.ExportModel"),
        key: '1',
        onClick: expotJson
      },
      {
        icon: <ImportOutlined />,
        label: t("UmlEditor.ImportModel"),
        key: '2',
        onClick: importJson,
      },
    ]
  ), [expotJson, importJson, handleAddPackage, t]);

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