import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback, useState } from "react"
import { useCreateNewPackage } from '../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useExportModelJson } from "../hooks/useExportModelJson";
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "AppDesigner/hooks/useEdittingAppUuid";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { PackageMeta, PackageStereoType } from "../meta/PackageMeta";
import { useImportModelJson } from "../hooks/useImportModelJson";

export const ModelRootAction = memo(() => {
  const appId = useEdittingAppId();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const setPackages = useSetRecoilState(packagesState(appId));
  const createNewPackage = useCreateNewPackage(appId);
  const backup = useBackupSnapshot(appId);
  const expotJson = useExportModelJson(appId);
  const importJson = useImportModelJson(appId);
  const { t } = useTranslation();

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleAddPackage = useCallback(
    () => {
      setNewPackage(createNewPackage(PackageStereoType.Normal));
    },
    [createNewPackage],
  );

  const handleAddService = useCallback(
    () => {
      setNewPackage(createNewPackage(PackageStereoType.Service));
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

  return (
    <>
      <Dropdown
        menu={{
          onClick: (info) => info.domEvent.stopPropagation(),
          items: [
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
              icon: <AppstoreAddOutlined />,
              label: t("UmlEditor.AddService"),
              key: '1',
              onClick: e => {
                e.domEvent.stopPropagation();
                handleAddService();
              }
            },
            {
              icon: <DownloadOutlined />,
              label: t("UmlEditor.ExportModel"),
              key: '2',
              onClick: expotJson
            },
            {
              icon: <ImportOutlined />,
              label: t("UmlEditor.ImportModel"),
              key: '3',
              onClick: importJson,
            },
          ]
        }}
        trigger={['click']}>
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