import { type DialogProps } from 'element-plus'
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
export interface Props {
  dialogProps: Partial<Mutable<DialogProps>>
  footer: {
    text: string
    onClick: () => void
  }[]
}
