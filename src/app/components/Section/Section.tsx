import type { FC, ReactNode } from 'react'

import styles from './Section.module.scss'

type SubSection = {
  title?: ReactNode
  content: ReactNode
}

type SectionProps = {
  title: ReactNode
  subsections: SubSection[]
}

export const Section: FC<SectionProps> = ({title, subsections}) => {
  return (<section className={styles.root}>
    <h2>{title}</h2>
    <div className={styles.subsections}>
      {subsections.map((subsection, index) => <article className={styles.subsection} key={index}>
        <h3>{subsection.title}</h3>
        <div>{subsection.content}</div>
      </article>)}
    </div>
  </section>)
}
