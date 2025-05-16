<script setup lang="ts">
import { Props } from './props'
const _props = defineProps<Props>()
</script>

<template>
  <el-dialog
    v-bind="dialogProps"
    destroy-on-close
    v-model="dialogProps.modelValue"
  >
    <template #header="{ close }">
      <div class="dialog-header flex jusitify-between">
        <span>{{ dialogProps.title }}</span>
      </div>
    </template>
    <slot></slot>
    <template #footer>
      <div class="dialog-footer flex jusitify-center space-x-3">
        <el-button
          v-for="item of footer"
          :key="item.text"
          @click="item.onClick"
          >{{ item.text }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
