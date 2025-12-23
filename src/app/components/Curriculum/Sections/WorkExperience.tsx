import type { FC } from 'react'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'
import type { WorkExperience as WorkExperienceType } from '@/types/curriculum'
import { sortTimelineItems } from '@/utils/sortTimelineItems'

interface WorkExperienceProps {
  workExperience: WorkExperienceType[]
}

const WorkExperience: FC<WorkExperienceProps> = ({ workExperience }) => {
  const sortedJobs = sortTimelineItems(workExperience);
  return (
      <Section
        title={'Work Experience'}
        subsections={sortedJobs.map((job) =>
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
