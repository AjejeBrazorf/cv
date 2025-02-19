import type { FC} from 'react'
import Image from 'next/image'
import React from 'react'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'

import styles from './WorkExperience.module.scss'

export interface Job {
  position: string
  company: string
  link: string
  time: {
    start: string | null
    end: string | null
  }
  location: string
  tasks: string[]
  iconUrl: string
}

interface WorkExperienceProps {
  workExperience: Job[]
}

const WorkExperience: FC<WorkExperienceProps> = ({ workExperience }) => {
  return (
      <Section
        title={'Work Experience'}
        subsections={workExperience
          .sort((jobA, jobB) => new Date(jobB.time.end || jobB.time.start || '').getTime() - new Date(jobA.time.end || jobA.time.start || '').getTime())
          .map((job) =>
        {
          return {
            title: (<>{job.position} at{' '}
              <a className={styles.link} href={job.link} target="_blank" rel="noopener noreferrer">
                {job.company}
              </a>{' '}
              <Image className={styles.logo} src={job.iconUrl} alt={`${job.company} logo`} width={100} height={50} loading='lazy' />
            </>),
            content:
            (
              <>
                <TimelineEntry time={job.time} place={job.location} />
                <h4>Responsibilities</h4>
                <ul>
                  {job.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </>)
          }
        })}
      />
  )
}

export default WorkExperience
