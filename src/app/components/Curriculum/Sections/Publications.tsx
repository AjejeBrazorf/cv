import type { FC } from 'react'

import { Section } from '@/app/components/Section/Section'
import type { Publication as PublicationType } from '@/types/curriculum'

interface PublicationsProps {
  publications: PublicationType[]
}

const Publications: FC<PublicationsProps> = ({ publications }) => {
  return (
      <Section
        title='Publications'
        subsections={publications.map((publication) =>
          {
        return {
          title: (<a target="_blank" rel="noopener noreferrer" href={publication.link}>
        <h3>{publication.title}</h3>
      </a>),
      content: (
      <>
        <p>{publication.date}</p>
        <p>{publication.description}</p>
      </>
      ),
      }})}
      />

  )
}

export default Publications
