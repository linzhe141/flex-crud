import { Component, defineComponent, h, PropType, ref, VNode } from 'vue'
import {
  ElForm,
  ElFormItem,
  FormProps,
  FormItemProps,
  ElPopover,
} from 'element-plus'
import QuestionIcon from './question-icon.vue'

export type Props = {
  formProps: Partial<FormProps>
  items: (Partial<FormItemProps> & {
    style?: any
    type: 'form-item' | 'display-item'
    name: string
    tooltip?: {
      text: string
    }
    component:
      | {
          name: Component
          props?: any
          listeners?: {}
        }
      | ((vModel: any) => VNode)
  })[]
}
export type ExposeData = {
  validate: () => Promise<boolean>
}

const Form = defineComponent({
  props: {
    formProps: Object as PropType<Props['formProps']>,
    items: Array as PropType<Props['items']>,
  },

  setup(_props, { expose }) {
    const formRef = ref(null)
    const exposeData: ExposeData = {
      validate() {
        return new Promise(resolve => {
          formRef.value.validate(valid => {
            if (valid) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        })
      },
    }
    expose(exposeData)
    function createDisplayWrapper(dispalyItem: Props['items'][number]) {
      const displayWrapper = h(
        'div',
        null,
        typeof dispalyItem.component === 'object'
          ? normalizeVModelComponent(dispalyItem.component, {
              modelValue: _props.formProps.model[dispalyItem.name],
              'onUpdate:modelValue': newValue =>
                (_props.formProps.model[dispalyItem.name] = newValue),
            })
          : dispalyItem.component({
              modelValue: _props.formProps.model[dispalyItem.name],
              'onUpdate:modelValue': newValue =>
                (_props.formProps.model[dispalyItem.name] = newValue),
            }),
      )
      return displayWrapper
    }

    function createFormItem(formItem: Props['items'][number]) {
      const questionWrapper = h(
        'div',
        {
          style: { width: '24px', marginLeft: '4px' },
        },
        [
          formItem.tooltip &&
            h(
              ElPopover,
              { trigger: 'click' },
              {
                reference() {
                  return h(QuestionIcon)
                },
                default() {
                  return h('div', { innerHTML: formItem.tooltip.text })
                },
              },
            ),
        ],
      )

      const formItemWrapper = h(
        ElFormItem,
        {
          ...formItem,
          label: formItem.label + ':',
          style: {
            width: '100%',
          },
          prop: formItem.name,
        },
        {
          default() {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                },
              },
              [
                h(
                  'div',
                  { style: { flex: 1 } },
                  typeof formItem.component === 'object'
                    ? normalizeVModelComponent(formItem.component, {
                        modelValue: _props.formProps.model[formItem.name],
                        'onUpdate:modelValue': newValue =>
                          (_props.formProps.model[formItem.name] = newValue),
                      })
                    : formItem.component({
                        modelValue: _props.formProps.model[formItem.name],
                        'onUpdate:modelValue': newValue =>
                          (_props.formProps.model[formItem.name] = newValue),
                      }),
                ),
                questionWrapper,
              ],
            )
          },
        },
      )
      return formItemWrapper
    }

    return () => {
      const vnode = h(
        ElForm,
        {
          ..._props.formProps,
          ref: formRef,
          style: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        },
        {
          default() {
            return _props.items.map((item, index) => {
              const containerProps = {
                key: item.label + '-' + index,
                style: Object.assign(
                  { width: '50%', padding: '0 10px' },
                  item.style,
                ),
              }
              const chilren: VNode[] = []
              if (item.type === 'display-item') {
                const displayWrapper = createDisplayWrapper(item)
                chilren.push(displayWrapper)
              } else if (item.type === 'form-item') {
                const formItemWrapper = createFormItem(item)
                chilren.push(formItemWrapper)
              }
              return h('div', containerProps, chilren)
            })
          },
        },
      )
      return vnode
    }
  },
})

export default Form

function normalizeListeners(
  listeners: undefined | Record<string, Function>,
  vModel: {
    modelValue: any
    'onUpdate:modelValue': (newValue: any) => any
  },
) {
  const formatListeners = {}

  listeners &&
    Object.entries(listeners).forEach(([eventName, handler]) => {
      const name = 'on' + eventName[0].toUpperCase() + eventName.slice(1)
      formatListeners[name] = handler
    })

  Object.assign(formatListeners, vModel)
  return formatListeners
}

function normalizeVModelComponent(
  component: {
    name: Component
    props?: any
    listeners?: {}
  },
  vModel: {
    modelValue: any
    'onUpdate:modelValue': (newValue: any) => any
  },
) {
  const vnode = h(component.name, {
    ...(component.props ?? {}),
    ...normalizeListeners(component.listeners, vModel),
  })
  return vnode
}
