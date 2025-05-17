<script setup lang="ts">
import {
  Dialog,
  Form,
  type DialogProps,
  type FormProps,
  FormExposeData,
  Select,
} from '@flex-crud/element'

import { Title } from 'flex-crud'

import { h, reactive, ref, markRaw } from 'vue'
import { ElInput } from 'element-plus'

const model = defineModel()

const formRef = ref<FormExposeData>(null)

function closeHandle() {
  setTimeout(() => {
    model.value = false
  }, 500)
}

const getFormDefaultValue = () => ({
  x: null,
  y: 2,
  z: 3,
  type: null,
})
const formProps = reactive({
  formProps: {
    model: getFormDefaultValue(),
    labelWidth: 'auto',
  },
  items: [
    {
      // TODO 类型
      name: '',
      type: 'display-item',
      style: {
        width: 'calc(100% - 28px)',
        marginBottom: '12px',
      },
      component: () => h(Title, { title: '标题111123' }),
    },
    {
      type: 'form-item',
      label: '名称x',
      name: 'x',
      rules: [{ required: true, message: '请输入！' }],
      tooltip: {
        text: '123',
      },
      component: vModel =>
        h(
          ElInput,
          {
            ...vModel,
            placeholder: '请输入',
            onChange(val) {
              console.log('zzzzzzzzzzzzzzzzzzz', val)
            },
          },
          {
            suffix: () => h('div', null, '%'),
          },
        ),
    },
    {
      type: 'form-item',
      label: '名称y',
      name: 'y',
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
    {
      type: 'form-item',
      label: '名称z',
      name: 'z',
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
    {
      type: 'form-item',
      style: { width: '100%' },
      label: '类型',
      name: 'type',
      rules: [{ required: true, message: '请选择！' }],
      component: {
        name: markRaw(Select),
        props: {
          placeholder: '请选择',
          options: [
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
            { label: '类型3', value: 3 },
            { label: '类型4', value: 4 },
          ],
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
const dialogProps = reactive({
  dialogProps: {
    width: '800px',
    modelValue: true,
    title: '新增',
  },
  footer: [
    {
      text: '关闭',
      onClick() {
        dialogProps.dialogProps.modelValue = false
      },
    },
    {
      text: '保存',
      async onClick() {
        const validate = await formRef.value.validate()
        if (validate) dialogProps.dialogProps.modelValue = false
      },
    },
  ],
}) as DialogProps
</script>

<template>
  <Dialog v-bind="dialogProps" @close="closeHandle">
    <Form ref="formRef" v-bind="formProps" />
  </Dialog>
</template>
