import { Card } from "antd"
import { memo } from "react"

const { Meta } = Card;
export const AppCard = memo(() => {
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  )
})