import { Card, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SendOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import { IApp } from "model";
import styled from "styled-components";
import {Image} from "components/Image";

const { Meta } = Card;

const StyledCard = styled(Card)`
  width:100%;
  overflow: hidden;
`
const items: MenuProps['items'] = [
  {
    label: "导出",
    key: '0',
    icon: <DownloadOutlined />
  },
  {
    label: "发布",
    key: '1',
    icon: <CloudUploadOutlined />
  },
  {
    type: 'divider',
  },
  {
    label: '删除',
    key: '3',
    icon: <DeleteOutlined />
  },
];

export const AppCard = memo((props: {
  app: IApp,
}) => {
  const { app } = props;
  return (
    <StyledCard
      hoverable
      cover={
        <Image
          value={app.imageUrl}
        />
      }
      actions={[
        <SendOutlined key="preview" />,
        <EditOutlined key="edit" />,
        <SettingOutlined key="setting" />,
        <Dropdown menu={{ items }} trigger={['click', 'hover']}><EllipsisOutlined key="ellipsis" /></Dropdown>,
      ]}
    >
      <Meta
        title={app.title}
      />
    </StyledCard>
  )
})