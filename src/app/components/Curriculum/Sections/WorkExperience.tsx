import type { FC } from 'react'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'
import type { WorkExperience as WorkExperienceType } from '@/types/curriculum'


interface WorkExperienceProps {
  workExperience: WorkExperienceType[]
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
            title: `${job.position} at ${job.company}`,
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
