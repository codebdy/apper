import { Button, Space } from "antd";
import { Spring } from "../Spring";
import { memo, useCallback } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next";
import { CreateServiceDialog } from "./ServiceModal/CreateServiceDialog";
import { useOpenFile } from "hooks/useAppOpenFile";

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
`

export const ServiceManagerHeader = memo(() => {
  const { t } = useTranslation();
  //const [importApp, { loading, error }] = useImportApp();
  const openFile = useOpenFile(".json");

  //useShowError(error);

  const handleImport = useCallback(() => {
    openFile().then((file: File) => {
      //importApp(file)
    })
  }, [openFile])

  return (
    <Container>
      <Spring />
      <Space>
        <Button onClick={handleImport} loading={false}>
          {t('ServiceManager.ImportService')}
        </Button>
        <CreateServiceDialog />
      </Space>
    </Container>
  )
})