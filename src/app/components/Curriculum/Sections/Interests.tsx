import type { FC } from 'react'
import React from 'react'

import { Chip } from '@/app/components/Chip/Chip'
import { ChipList } from '@/app/components/ChipList/ChipList'
import { Section } from '@/app/components/Section/Section'


export interface InterestsProps {
  interests: string[]
}

const Interests: FC<InterestsProps> = ({ interests }) => {
  return (
    <Section title={'Interests & Hobbies'} subsections={[
      {
        content:
          <ChipList
            chips={interests
              .map((interest) =><Chip key={interest}>
                {interest}
              </Chip>)} />
      }
    ]
    } />
  )
}

export default Interests
