<script setup lang="ts">
const props = defineProps<{
  row: Record<string, any>
  operateList: {
    text: string
    show: (row: Record<string, any>) => boolean
    onClick: (row: Record<string, any>) => any
  }[]
}>()
</script>

<template>
  <div>
    <div
      v-for="operate of operateList"
      :key="operate.text"
      @click="() => operate.onClick(row)"
    >
      {{ operate.text }}
    </div>
  </div>
</template>
