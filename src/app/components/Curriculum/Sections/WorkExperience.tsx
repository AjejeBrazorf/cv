import type { FC} from 'react'
import Image from 'next/image'
import React from 'react'

import { Section } from '@/app/components/Section/Section'

import styles from './WorkExperience.module.scss'

export interface Job {
  position: string
  company: string
  link: string
  duration_start: string
  duration_end: string
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
        subsections={workExperience.map((job) =>
        {
          return {
            title: (<>{job.position} at{' '}
              <a className={styles.link} href={job.link} target="_blank" rel="noopener noreferrer">
                {job.company}
              </a>{' '}
              <Image src={job.iconUrl} alt={`${job.company} logo`} width={100} height={50} />
            </>),
            content:
            (
              <>
                <p>
                  {job.duration_start} - {job.duration_end}
                </p>
                <p>{job.location}</p>
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
