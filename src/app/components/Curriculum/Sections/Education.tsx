import type { FC } from 'react'

import { Section } from '@/app/components/Section/Section'
import { TimelineEntry } from '@/app/components/TimelineEntry'
import type { Education as EducationType } from '@/types/curriculum'


interface EducationProps {
  education: EducationType[]
}

const Education: FC<EducationProps> = ({ education }) => {
  return (<Section
        title={'Education'}
        subsections={education
          .sort((eduA, eduB) => new Date(eduB.time.end || eduB.time.start || '').getTime() - new Date(eduA.time.end || eduA.time.start || '').getTime())
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
