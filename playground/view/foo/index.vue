<script setup lang="ts">
import { Table, SearchForm, type FCTableProps } from '@flex-crud/element'
import {
  ContainerWrapper,
  type TableToolbarProps,
  TableToolbar,
} from 'flex-crud'
import OperateCell from '../../../packages/flex-crud/src/components/operate-cell/operate-cell.vue'
import { h, markRaw, reactive, ref } from 'vue'
import { ElInput } from 'element-plus'
import AddEditDialog from './dialog/add-edit/dialog.vue'

const getSearchFormDefaultValue = () => ({
  x: 1,
  y: 2,
  z: 3,
})

const searchFormProps = reactive({
  formProps: {
    model: getSearchFormDefaultValue(),
  },
  items: [
    {
      label: '名称',
      name: 'x',
      component: {
        name: markRaw(ElInput),
        props: {
          placeholder: '请输入',
        },
        listeners: {
          change(val) {
            console.log(val)
          },
        },
      },
    },
  ],
})

function onSearch() {
  const formData = searchFormProps.formProps.model
  console.log(formData)
  tableProps.props.data = [
    { id: 1, type: 3, name: 'a' },
    { id: 2, type: 1, name: 'b' },
    { id: 3, type: 2, name: 'c' },
    { id: 4, type: 3, name: 'd' },
  ]
}

function onReset() {
  Object.assign(searchFormProps.formProps.model, getSearchFormDefaultValue())
}

// 表格相关操作
const showAddEditDialog = ref(false)
const tableRef = ref<InstanceType<typeof Table>>(null)
const tableToolbarProps = reactive({
  batchOprates: [
    {
      text: '删除',
      show: true,
      onClick() {
        if (selections.length === 0) {
          console.error('请先选择数据')
          return
        }
        tableRef.value.clearSelection()
        console.log('xxxxxx')
      },
    },
  ],
  operates: [
    {
      text: '新增',
      show: true,
      onClick() {
        showAddEditDialog.value = true
      },
    },
  ],
}) as TableToolbarProps

let selections = []
const tableProps = reactive({
  listeners: {
    'selection-change'(select) {
      selections = select
    },
    'sort-change'(...args) {
      console.log(args)
    },
  },
  props: {
    rowKey: 'id',
    data: [],
  },
  columns: [
    { type: 'selection' },
    {
      label: '类型',
      prop: 'type',
      sortable: true,
    },
    { label: '名称', prop: 'name' },
    {
      label: '操作',
      formatter(...args) {
        const [row] = args
        return h(OperateCell, {
          row,
          operateList: [
            {
              text: '启动',
              show: () => true,
              onClick(row) {
                console.log(row)
              },
            },
          ],
        })
      },
    },
  ],
}) as FCTableProps
</script>
<template>
  <div class="space-y-4">
    <ContainerWrapper>
      <SearchForm
        v-bind="searchFormProps"
        @search="onSearch"
        @reset="onReset"
      />
    </ContainerWrapper>

    <ContainerWrapper>
      <TableToolbar v-bind="tableToolbarProps"></TableToolbar>
      <Table
        ref="tableRef"
        :props="tableProps.props"
        :listeners="tableProps.listeners"
        :columns="tableProps.columns"
      />
    </ContainerWrapper>
  </div>
  <AddEditDialog v-if="showAddEditDialog" v-model="showAddEditDialog" />
</template>
