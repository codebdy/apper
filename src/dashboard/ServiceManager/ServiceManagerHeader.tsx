import { Button, Space } from "antd";
import { Spring } from "../Spring";
import { memo, useCallback } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { useImportApp } from "enthooks/hooks/useImportApp";
import { useAppOpenFile } from "./hooks/useAppOpenFile";
import { useShowError } from "designer/hooks/useShowError";
import { CreateServiceDialog } from "./ServiceModal/CreateServiceDialog";

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
`

export const ServiceManagerHeader = memo(() => {
  const { t } = useTranslation();
  const [importApp, { loading, error }] = useImportApp();
  const openFile = useAppOpenFile();

  useShowError(error);

  const handleImport = useCallback(() => {
    openFile().then((file: File) => {
      importApp(file)
    })
  }, [importApp, openFile])

  return (
    <Container>
      <Spring />
      <Space>
        <Button onClick={handleImport} loading={loading}>
          {t('AppManager.ImportApp')}
        </Button>
        <CreateServiceDialog />
      </Space>
    </Container>
  )
})