import 'element-plus/dist/index.css'

import SearchForm from './src/search-form/search-form.vue'

import Table from './src/table/table.vue'
import { type Props as FCTableProps } from './src/table/props'

import Dialog from './src/dialog/dialog.vue'
import { type Props as DialogProps } from './src/dialog/props'

import Form, {
  type Props as FormProps,
  type ExposeData as FormExposeData,
} from './src/form/form'

import Select from './src/select/select.vue'

export {
  Table,
  SearchForm,
  FCTableProps,
  Dialog,
  DialogProps,
  Form,
  FormProps,
  FormExposeData,
  Select,
}
