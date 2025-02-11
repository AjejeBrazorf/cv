import type { FC } from 'react'
import React from 'react'

import { Chip } from '@/app/components/Chip/Chip'
import { Section } from '@/app/components/Section/Section'
import { ChipList } from '@/app/components/ChipList/ChipList'

export interface Language {
  id: number
  language: string
  proficiency: string
}

export interface LanguagesProps {
  languages: Language[]
}


const Languages: FC<LanguagesProps> = ({ languages }) => {
  return (
      <Section title={'Languages'} subsections={[
        {
          content:
            <ChipList
              chips={languages.map(({ language, proficiency, id }) =><Chip key={id}>
                    {language}: {proficiency}
                  </Chip>)} />
        }
      ]
      } />
  )
}

export default Languages
