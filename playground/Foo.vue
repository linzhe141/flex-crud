<script setup lang="ts">
import {
  Table,
  SearchForm,
  type FCTableProps,
  Dialog,
  type DialogProps,
  Form,
  type FormProps,
  FormExposeData,
} from '@flex-crud/element'
import {
  ContainerWrapper,
  type TableToolbarProps,
  TableToolbar,
} from 'flex-crud'
import OperateCell from './OperateCell.vue'
import { h, reactive, ref } from 'vue'
import { ElInput, InputProps } from 'element-plus'

import Title from './Title.vue'

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
        name: ElInput,
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
        addEditDialogProps.dialogProps.modelValue = true
        Object.assign(
          addEditFormProps.formProps.model,
          getAddFormDefaultValue(),
        )
        console.log('11111')
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

const addEditFormRef = ref<FormExposeData>(null)

const getAddFormDefaultValue = () => ({
  x: null,
  y: 2,
  z: 3,
})
const addEditFormProps = reactive({
  formProps: {
    model: getAddFormDefaultValue(),
    labelWidth: 'auto',
  },
  items: [
    {
      // TODO 类型
      name: '',
      type: 'display-item',
      style: {
        width: '100%',
        marginBottom: '12px',
      },
      component: {
        name: Title,
        props: {
          title: '标题1',
        },
      },
    },
    {
      type: 'form-item',
      label: '名称x',
      name: 'x',
      rules: [{ required: true, message: '请输入！' }],
      tooltip: {
        text: '123',
      },
      component: {
        name: ElInput,
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
    {
      type: 'form-item',
      label: '名称y',
      name: 'y',
      component: {
        name: ElInput,
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
    {
      type: 'form-item',
      label: '名称z',
      name: 'z',
      component: {
        name: ElInput,
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
}) as FormProps
const addEditDialogProps = reactive({
  dialogProps: {
    width: '800px',
    modelValue: false,
    title: '新增',
  },
  footer: [
    {
      text: '关闭',
      onClick() {
        addEditDialogProps.dialogProps.modelValue = false
      },
    },
    {
      text: '保存',
      async onClick() {
        const validate = await addEditFormRef.value.validate()
        if (validate) addEditDialogProps.dialogProps.modelValue = false
      },
    },
  ],
}) as DialogProps
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
  <Dialog v-bind="addEditDialogProps">
    <Form ref="addEditFormRef" v-bind="addEditFormProps" />
  </Dialog>
</template>
