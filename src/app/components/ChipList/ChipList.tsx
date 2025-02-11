import type { FC, ReactNode } from 'react'

import styles from './ChipList.module.scss'

type ChipListProps = {
  chips: ReactNode[]
}
export const ChipList:FC<ChipListProps> = ({chips}) =>
  <div className={styles.root}>
    {chips.map(chip => chip)}
  </div>
