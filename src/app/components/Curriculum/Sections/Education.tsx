import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'

import styles from './Education.module.scss'

export interface EducationItem {
  degree: string
  institution: string
  link: string
  time: {
    start: string | null
    end: string | null
  }
  location: string
  iconUrl: string
  final_grade?: string
}

interface EducationProps {
  education: EducationItem[]
}

const Education: FC<EducationProps> = ({ education }) => {

  return (<Section
        title={'Education'}
        subsections={education
          .sort((eduA, eduB) => new Date(eduB.time.end || eduB.time.start || '').getTime() - new Date(eduA.time.end || eduA.time.start || '').getTime())
          .map((activity) =>
        {
          return {
            title: (<>
              {activity.degree} at <Image className={styles.logo} src={activity.iconUrl} alt={`${activity.institution} logo`} fill loading='lazy' />
              <a className={styles.link} href={activity.link} target="_blank" rel="noopener noreferrer">
                {activity.institution}
              </a>
            </>),
            content:
              (
                <>
                  <TimelineEntry time={activity.time}
                  place={activity.location}
                  />
                  {activity.final_grade && <p>Final Grade: {activity.final_grade}</p>}
                </>)
          }
        })}
      />
  )
}

export default Education
