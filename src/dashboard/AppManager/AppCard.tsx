import { Card } from "antd"
import { memo } from "react"
import { EditOutlined, EllipsisOutlined, SettingOutlined, SendOutlined } from '@ant-design/icons';

const { Meta } = Card;
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
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title="Card title"
      />
    </Card>
  )
})