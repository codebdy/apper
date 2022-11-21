import { observer } from "@formily/reactive-react"

export interface IEnumTagsProps {
  value?: string | string[]
}

export const EnumTag = observer((props: IEnumTagsProps) => {
  const { value, ...other } = props;

  return (
    <div {...other}>
      {value}
    </div>
  )
})