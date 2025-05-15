<script setup lang="ts">
import { Table, Form } from '@flex-crud/element'
import { ContainerWrapper } from 'flex-crud'
import OperateCell from './OperateCell.vue'
import { h } from 'vue'

const tableProps = {
  listeners: {
    'sort-change'(...args) {
      console.log(args)
    },
  },
  props: {
    rowKey: 'id',
    data: [
      { id: 1, type: 3, name: 'a' },
      { id: 2, type: 1, name: 'b' },
      { id: 3, type: 2, name: 'c' },
      { id: 4, type: 3, name: 'd' },
    ],
  },
  columns: [
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
}
</script>
<template>
  <div class="space-y-4">
    <ContainerWrapper>
      <Form />
    </ContainerWrapper>

    <ContainerWrapper>
      <Table v-bind="tableProps" />
    </ContainerWrapper>
  </div>
</template>
