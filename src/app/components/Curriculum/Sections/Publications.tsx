import type { FC } from 'react'
import React from 'react'

import { Section } from '@/app/components/Section/Section'


export interface Publication {
  title: string
  link: string
  date: string
  description: string
}

interface PublicationsProps {
  publications: Publication[]
}

const Publications: FC<PublicationsProps> = ({ publications }) => {
  return (
      <Section
        title='Publications'
        subsections={publications.map((publication, index) =>
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
