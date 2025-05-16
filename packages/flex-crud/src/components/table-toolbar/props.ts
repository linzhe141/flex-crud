export interface TableToolbarProps {
  batchOprates: {
    text: string
    show?: boolean
    onClick: () => void
  }[]
  operates: {
    text: string
    show?: boolean
    onClick: () => void
  }[]
}
