<script setup lang="ts">
import { TableToolbarProps } from './props'
const props = defineProps<TableToolbarProps>()
</script>

<template>
  <div class="table-toolbar-wrapper flex justify-between">
    <div class="batch-operate flex gap-3">
      <button
        v-for="item of batchOprates"
        :key="item.text"
        @click="item.onClick"
        class="px-4 py-2 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm font-medium"
        type="button"
      >
        {{ item.text }}
      </button>
    </div>
    <div class="operate flex gap-3">
      <button
        v-for="item of operates"
        :key="item.text"
        @click="item.onClick"
        class="px-4 py-2 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm font-medium"
        type="button"
      >
        {{ item.text }}
      </button>
    </div>
  </div>
</template>
