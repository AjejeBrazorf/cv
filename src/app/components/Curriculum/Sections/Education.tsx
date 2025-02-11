import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'

import { Section } from '@/app/components/Section/Section'

import styles from './Education.module.scss'

export interface EducationItem {
  degree: string
  institution: string
  link: string
  duration: string
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
        subsections={education.map((activity) =>
        {
          return {
            title: (<>
              {activity.degree} at <Image src={activity.iconUrl} alt={`${activity.institution} logo`} width={125} height={50} />
              <a className={styles.link} href={activity.link} target="_blank" rel="noopener noreferrer">
                {activity.institution}
              </a>
            </>),
            content:
              (
                <>
                  <p>{activity.duration}</p>
                  <p>{activity.location}</p>
                  {activity.final_grade && <p>Final Grade: {activity.final_grade}</p>}
                </>)
          }
        })}
      />
  )
}

export default Education
