import type { ReactNode } from 'react'

import styles from './Chip.module.scss'

export const Chip =({children}: {children: ReactNode}) =>
  <span className={styles.root}>{children}</span>
