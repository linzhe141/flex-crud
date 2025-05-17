<script setup lang="ts">
import { ElOption, ElSelect } from 'element-plus'

const modelValueRef = defineModel()
</script>

<template>
  <ElSelect v-bind="$attrs" v-model="modelValueRef">
    <ElOption
      v-for="i of $attrs.options as any"
      :key="i.value"
      :label="i.label"
      :value="i.value"
    ></ElOption>
  </ElSelect>
</template>
