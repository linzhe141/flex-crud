<template>
  <el-table ref="tableRef" class="w-full" v-bind="props" v-on="listeners">
    <el-table-column v-for="col of columns" :key="col.prop" v-bind="col" />
  </el-table>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import { Props } from './props'
import { ref } from 'vue'
const tableRef = ref(null)

defineProps<Props>()
defineExpose({
  clearSelection() {
    tableRef.value!.clearSelection()
  },
})
</script>
