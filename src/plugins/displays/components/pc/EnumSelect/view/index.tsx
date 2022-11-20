import { observer } from "@formily/reactive-react"

export interface IEnumSelectProps {
  value?: string
}

export const EnumSelect = observer((props: IEnumSelectProps) => {
  const { ...other } = props;

  return (
    <div {...other}>
    </div>
  )
})