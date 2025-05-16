import { Component, defineComponent, h, PropType, ref, VNode } from 'vue'
import {
  ElForm,
  ElFormItem,
  FormProps,
  FormItemProps,
  ElButton,
  ElPopover,
} from 'element-plus'

export type Props = {
  formProps: Partial<FormProps>
  items: (Partial<FormItemProps> & {
    style?: any
    type: 'form-item' | 'display-item'
    name: string
    tooltip?: {
      text: string
    }
    component: {
      name: Component
      props?: any
      listeners?: {}
    }
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
              const props = {
                key: item.label + '-' + index,
                style: Object.assign(
                  { width: '50%', padding: '0 10px' },
                  item.style,
                ),
              }
              const chilren: VNode[] = []
              if (item.type === 'display-item') {
                const listeners = {}
                item.component.listeners &&
                  Object.entries(item.component.listeners).forEach(
                    ([eventName, handler]) => {
                      const name =
                        'on' + eventName[0].toUpperCase() + eventName.slice(1)
                      listeners[name] = handler
                    },
                  )
                const displayWrapper = h(
                  'div',
                  null,
                  h(item.component.name, {
                    ...item.component.props,
                    ...listeners,
                    modelValue: _props.formProps.model[item.name],
                    'onUpdate:modelValue': newValue =>
                      (_props.formProps.model[item.name] = newValue),
                  }),
                )
                chilren.push(displayWrapper)
              } else if (item.type === 'form-item') {
                const formItem = h(
                  ElFormItem,
                  {
                    ...item,
                    label: item.label + ':',
                    style: {
                      width: '100%',
                    },
                    prop: item.name,
                  },
                  {
                    default() {
                      const listeners = {}
                      item.component.listeners &&
                        Object.entries(item.component.listeners).forEach(
                          ([eventName, handler]) => {
                            const name =
                              'on' +
                              eventName[0].toUpperCase() +
                              eventName.slice(1)
                            listeners[name] = handler
                          },
                        )

                      return h(
                        'div',
                        {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                          },
                        },
                        h(
                          'div',
                          { style: { flex: 1 } },
                          h(item.component.name, {
                            ...item.component.props,
                            ...listeners,
                            modelValue: _props.formProps.model[item.name],
                            'onUpdate:modelValue': newValue =>
                              (_props.formProps.model[item.name] = newValue),
                          }),
                        ),
                      )
                    },
                  },
                )
                chilren.push(formItem)
              }
              return h('div', props, chilren)
            })
          },
        },
      )
      return vnode
    }
  },
})

export default Form
