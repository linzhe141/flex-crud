import { createApp, type App } from 'vue'
import RootApp from './src/root-app.vue'
import { router } from './src/router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

let app: App | null = null

export function getContext() {
  return {
    app,
    router,
  }
}

export function setup() {
  app = createApp(RootApp)
  app.use(router)
  app.use(ElementPlus, {
    locale: zhCn,
  })
  app.mount(document.querySelector('#root')!)
}

export * from './src/components'
