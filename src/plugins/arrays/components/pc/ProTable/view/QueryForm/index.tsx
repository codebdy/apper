import React, { useMemo, useState, useCallback, CSSProperties } from 'react'
import { observer } from '@formily/react'
import {
  FormGrid,
  FormLayout,
} from 'formily/antd4'
import { ButtonsGridColum } from './ButtonsGridColum'
import { Card } from 'antd'

type formilyGrid = typeof FormGrid

export type IQueryFormProps = {
  maxRowsOnCollapsed?: number,
  maxColumns?: number,
  maxWidth?: number,
  layout?: "horizontal" | "vertical",
  collapsiable?: boolean,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
  colon?: boolean,
  value?: any,
  onChange?: (value: any) => void,
} & React.ComponentProps<formilyGrid>

const FormGridAny = FormGrid as any;

export const QueryForm: React.FC<IQueryFormProps> = observer((props) => {
  const {
    layout = "horizontal",
    collapsiable = true,
    colon = true,
    maxRowsOnCollapsed = 1,
    minWidth,
    maxWidth,
    minColumns,
    maxColumns,
    breakpoints,
    columnGap,
    rowGap,
    colWrap,
    strictAutoFit,
    children,
    style,
    value,
    onChange,
    ...other
  } = props as any;
  const [expanded, setExpanded] = useState(false);


  const grid = useMemo(
    () => {
      return FormGrid.createFormGrid({
        maxColumns: maxColumns,
        maxWidth: maxWidth,
        maxRows: expanded && collapsiable ? maxRowsOnCollapsed : Infinity,
        shouldVisible: (node: any, grid: any) => {
          if (!collapsiable) return true;
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return (node?.shadowRow || 0) < maxRowsOnCollapsed + 1 && (node.index || 0) < (maxColumns || 0) - 1
        },
      } as any)
    },
    [collapsiable, expanded, maxColumns, maxRowsOnCollapsed, maxWidth]
  )

  const handleToggle = useCallback(() => {
    setExpanded(expanded => !expanded)
  }, [])

  return (
    <Card {...other} style={{ ...style || {}, marginBottom: "16px" }}>
      <FormLayout layout={layout} colon={colon} feedbackLayout="terse">
        <FormGridAny
          grid={grid}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minColumns={minColumns}
          maxColumns={maxColumns}
          breakpoints={breakpoints}
          columnGap={columnGap}
          rowGap={rowGap}
          colWrap={colWrap}
          strictAutoFit={strictAutoFit}
          maxRows={expanded && collapsiable ? maxRowsOnCollapsed : Infinity}
        >
          {children}
          {
            !collapsiable && <ButtonsGridColum collapsiable={collapsiable} layout={layout} expanded={expanded} onToggle={handleToggle} />
          }
        </FormGridAny>
        {
          collapsiable && <ButtonsGridColum collapsiable={collapsiable} layout={layout} expanded={expanded} onToggle={handleToggle} />
        }
      </FormLayout>
    </Card>
  )
})
