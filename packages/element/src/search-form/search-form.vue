<template>
  <el-form v-bind="formProps" inline>
    <el-form-item
      v-for="(item, index) in items"
      :key="item.label + '-' + index"
      v-bind="item"
      :label="item.label + ':'"
    >
      <component
        :is="item.component.name"
        v-model="formProps.model[item.name]"
        v-bind="item.component.props"
        v-on="item.component.listeners"
      ></component>
    </el-form-item>
    <div>
      <el-button type="primary" @click="() => $emit('search')">查询</el-button>
      <el-button @click="() => $emit('reset')">重置</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {
  ElForm,
  ElFormItem,
  FormProps,
  FormItemProps,
  ElButton,
} from 'element-plus'
import { reactive, type Component, watch } from 'vue'

type Props = {
  formProps: Partial<FormProps>
  items: (Partial<FormItemProps> & {
    name: string
    component: {
      name: Component
      props?: any
      listeners?: any
    }
  })[]
}

const _props = defineProps<Props>()

const _emits = defineEmits<{ search: []; reset: [] }>()

function createProxy() {
  const formData = _props.formProps.model
  const proxy = {}
  Object.keys(formData).map(key => {
    Object.defineProperty(proxy, key, {
      get() {
        return formData[key]
      },
      set(newValue) {
        formData[key] = newValue
      },
    })
  })
}
</script>
