import { Card, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import { EditOutlined, EllipsisOutlined, SettingOutlined, SendOutlined } from '@ant-design/icons';

const { Meta } = Card;
const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export const AppCard = memo(() => {
  return (
    <Card
      style={{ width: "100%" }}
      hoverable
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
        title="Card title"
      />
    </Card>
  )
})