import { setup } from 'flex-crud'
import '../packages/flex-crud/dist/style.css'
import Foo from './Foo.vue'
const { router } = setup()
router.addRoute('root', {
  path: 'foo',
  component: Foo,
})
