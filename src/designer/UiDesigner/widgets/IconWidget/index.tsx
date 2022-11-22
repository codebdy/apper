import React, { createContext, useContext, useEffect, useRef } from 'react'
import { isStr, isFn, isObj, isPlainObj } from '@designable/shared'
import { observer } from '@formily/reactive-react'
import { Tooltip, TooltipProps } from 'antd'
import { usePrefix, useRegistry, useTheme } from 'designable/react'
import cls from 'classnames'
import './styles.less'

const IconContext = createContext<IconProviderProps|null>(null)

const isNumSize = (val: any) => /^[\d.]+$/.test(val)
export interface IconProviderProps {
  tooltip?: boolean
}

export interface IShadowSVGProps {
  content?: string
  width?: number | string
  height?: number | string
}
export interface IIconWidgetProps extends React.HTMLAttributes<HTMLElement> {
  tooltip?: React.ReactNode | TooltipProps
  infer: React.ReactNode | { shadow: string }
  size?: number | string
}

export const IconWidget: React.FC<IIconWidgetProps> & {
  Provider?: React.FC<IconProviderProps>
  ShadowSVG?: React.FC<IShadowSVGProps>
} = observer((props) => {
  const theme = useTheme()
  const context = useContext(IconContext)
  const registry = useRegistry()
  const prefix = usePrefix('icon')
  const size = props.size || '1em'
  const height = props.style?.height || size
  const width = props.style?.width || size
  const takeIcon: any = (infer: React.ReactNode) => {
    if (isStr(infer)) {
      const finded = registry.getDesignerIcon(infer)
      if (finded) {
        return takeIcon(finded)
      }
      return <img alt="" src={infer} height={height} width={width} />
    } else if (isFn(infer)) {
      return React.createElement(infer, {
        height,
        width,
        fill: 'currentColor',
      })
    } else if (React.isValidElement(infer)) {
      if (infer.type === 'svg') {
        return React.cloneElement(infer, {
          height,
          width,
          fill: 'currentColor',
          viewBox: infer.props.viewBox || '0 0 1024 1024',
          focusable: 'false',
          'aria-hidden': 'true',
        } as any)
      } else if (infer.type === 'path' || infer.type === 'g') {
        return (
          <svg
            viewBox="0 0 1024 1024"
            height={height}
            width={width}
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
          >
            {infer}
          </svg>
        )
      }
      return infer
    } else if (isPlainObj(infer)) {
      if ((infer as any)[theme as any]) {
        return takeIcon((infer as any)[theme as any])
      } else if ((infer as any)['shadow']) {
        const IconWidgetShadowSVG = IconWidget.ShadowSVG as any
        return (
          <IconWidgetShadowSVG
            width={width}
            height={height}
            content={(infer as any)['shadow']}
          />
        )
      }
      return null
    }
  }
  const renderTooltips = (children: React.ReactElement): React.ReactElement => {
    if (!isStr(props.infer) && context?.tooltip) return children as any
    const tooltip =
      props.tooltip || registry.getDesignerMessage(`icons.${props.infer}`)
    if (tooltip) {
      const title =
        React.isValidElement(tooltip) || isStr(tooltip)
          ? tooltip
          : tooltip.title
      const props =
        React.isValidElement(tooltip) || isStr(tooltip)
          ? {}
          : isObj(tooltip)
            ? tooltip
            : {}
      return (
        <Tooltip {...props} title={title}>
          {children}
        </Tooltip>
      )
    }
    return children
  }
  if (!props.infer) return null
  return renderTooltips(
    <span
      {...props}
      className={cls(prefix, props.className)}
      style={{
        ...props.style,
        cursor: props.onClick ? 'pointer' : props.style?.cursor,
      }}
    >
      {takeIcon(props.infer)}
    </span>
  )
})

IconWidget.ShadowSVG = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef<HTMLDivElement>()
  const width = isNumSize(props.width) ? `${props.width}px` : props.width
  const height = isNumSize(props.height) ? `${props.height}px` : props.height
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (ref.current) {
      const root = ref.current.attachShadow({
        mode: 'open',
      })
      root.innerHTML = `<svg viewBox="0 0 1024 1024" style="width:${width};height:${height}">${props.content}</svg>`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div ref={ref as any}></div>
}
const IconContextProvider = IconContext.Provider as any
IconWidget.Provider = (props) => {
  return (
    <IconContextProvider value={props}>{(props as any).children}</IconContextProvider>
  )
}