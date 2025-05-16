<script setup lang="ts">
defineProps<{
  title: string
}>()
defineExpose({
  x:1
})
</script>

<template>
  <div class="flex h-8 items-center bg-gray-100">
    <div class="w-1 h-full bg-blue-500 mr-2"></div>
    <div>{{ title }}</div>
  </div>
</template>
