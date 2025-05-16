import { setup, getContext } from 'flex-crud'
import '../packages/flex-crud/dist/style.css'
import Foo from './Foo.vue'
const { router } = getContext()

function main() {
  router.addRoute('root', {
    path: 'foo',
    component: Foo,
  })
  setup()
}

main()
