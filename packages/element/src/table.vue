<template>
  <el-table class="w-full" v-bind="props" v-on="listeners">
    <el-table-column v-for="col of columns" :key="col.prop" v-bind="col" />
  </el-table>
</template>

<script lang="ts" setup>
import {
  type TableProps,
  type TableColumnCtx,
  ElTable,
  ElTableColumn,
  ElLoading,
} from 'element-plus'
import 'element-plus/es/components/button/style/css'

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

type Props = {
  listeners?: { [K in (typeof tableEmits)[number]]?: (...args: any[]) => any }
  props: TableProps<Row>
  columns: Partial<TableColumnCtx<Row>>[]
}
const props = defineProps<Props>()
</script>
