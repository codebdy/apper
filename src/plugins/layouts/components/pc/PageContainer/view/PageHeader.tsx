import clx from "classnames"
import { useParseLangMessage } from "plugin-sdk"

export const PageHeader = (props: any) => {
  const { className, title, subTitle, children, ...other } = props
  const p = useParseLangMessage();
  return (
    <div
      className={clx(className, "rx-page-header-responsive")}
      title={title}
      subTitle={p(subTitle as any)}
      {...other}
    >{children}
    </div>
  )
}