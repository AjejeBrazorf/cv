import type { FC } from 'react'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'
import type { Education as EducationType } from '@/types/curriculum'
import { sortTimelineItems } from '@/utils/sortTimelineItems'

interface EducationProps {
  education: EducationType[]
}

const Education: FC<EducationProps> = ({ education }) => {
    const sortedActivities = sortTimelineItems(education);
  
  return (<Section
        title={'Education'}
        subsections={sortedActivities
          .map((activity) =>
        {
          return {
            title: `${activity.degree} at ${activity.institution}`,
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
