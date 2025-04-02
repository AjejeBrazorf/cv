import type { FC } from 'react'

import { Chip } from '@/app/components/Chip/Chip'
import { ChipList } from '@/app/components/ChipList/ChipList'
import { Section } from '@/app/components/Section/Section'
import type { Language as LanguageType } from '@/types/curriculum'

export interface LanguagesProps {
  languages: LanguageType[]
}

const Languages: FC<LanguagesProps> = ({ languages }) => {
  return (
      <Section title={'Languages'} subsections={[
        {
          content:
            <ChipList
              chips={languages.map(({ language, level }, index) =><Chip key={index}>
                    {language}: {level}
                  </Chip>)} />
        }
      ]
      } />
  )
}

export default Languages
