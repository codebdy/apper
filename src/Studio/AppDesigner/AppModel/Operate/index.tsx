import { EllipsisOutlined } from '@ant-design/icons';
import { useMetaId } from 'UmlEditor/hooks/useMetaId';
import { Button, Dropdown } from 'antd';
import { IMeta } from 'model/meta';
import { useApp } from "../../contexts";
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMeta } from 'UmlEditor/hooks/useGetMeta';
import { useImportAppJson } from '../hooks/useImportAppJson';
import { useExportAppJson } from '../hooks/useExportAppJson';

enum OperateEnum {
  exportJson = "exportJson",
  importJson = "importJson",
}

export const Operate = memo((
  props: {
    meta?: IMeta,
  }
) => {
  const { meta } = props;
  const { t } = useTranslation();
  const metaId = useMetaId();
  const app = useApp();
  const getMeta = useGetMeta(metaId)
  const importJson = useImportAppJson(metaId);
  const exportJson = useExportAppJson(metaId);

  const handleMenuClick = useCallback(({ key }: any) => {

    if (key === OperateEnum.exportJson) {
      exportJson({
        app,
        meta: meta ? { ...meta, content: getMeta() } : undefined,
      })
    } else if (key === OperateEnum.importJson) {
      importJson()
    }

  }, [app, exportJson, getMeta, importJson, meta])


  return (
    <>
      <Dropdown menu={{
        onClick: handleMenuClick,
        items: [
          {
            key: OperateEnum.exportJson,
            label: t("Designer.ExportJson"),
          },
          {
            key: OperateEnum.importJson,
            label: t("Designer.ImportJson"),
          },
        ]
      }} trigger={["click"]}>
        <Button onClick={e => e.preventDefault()} loading={false} icon={<EllipsisOutlined />}>
        </Button>
      </Dropdown>

    </>
  )
});
