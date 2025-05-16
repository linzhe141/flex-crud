import { TableColumnCtx, TableProps } from 'element-plus'

// copy 源码
const tableEmits = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-contextmenu',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
  'scroll',
] as const

type Row = Record<string, any>

export type Props = {
  listeners?: { [K in (typeof tableEmits)[number]]?: (...args: any[]) => any }
  props: TableProps<Row>
  columns: Partial<TableColumnCtx<Row>>[]
}
