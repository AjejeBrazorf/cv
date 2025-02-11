import type { FC } from 'react';
import React from 'react'

import Decoration1 from '../../assets/blob-scene-haikei-2.svg'
import Decoration2 from '../../assets/blob-scene-haikei.svg'

import styles from './Curriculum.module.scss'
import type { PersonalInfo } from './Sections/Header';
import Header from './Sections/Header'
import type { Job } from './Sections/WorkExperience';
import WorkExperience from './Sections/WorkExperience'
import type { EducationItem } from './Sections/Education';
import Education from './Sections/Education'
import Tools from './Sections/Tools'
import type { Publication } from './Sections/Publications';
import Publications from './Sections/Publications'
import type { Language } from './Sections/Languages';
import Languages from './Sections/Languages'
import Interests from './Sections/Interests'

type CurriculumProps = {
  personalInfo: PersonalInfo
  workExperience: Job[]
  education: EducationItem[]
  tools: Record<string, string[]>
  publications: Publication[]
  languages: Language[]
  interests: string[]
}

export const Curriculum: FC<CurriculumProps> = ({
                                                  personalInfo,
                                                  workExperience,
                                                  education,
                                                  tools,
                                                  publications,
                                                  languages,
                                                  interests,
                                                }) => {
  return (
    <div className={styles.resumeContainer}>
      <div className={styles.resume}>
        <Decoration1 />
        <Decoration2 />
        <p className={styles.title}>{personalInfo.title}</p>
        <p className={styles.quote}>{personalInfo.quote}</p>

        <Header personalInfo={personalInfo} />

        <main className={styles.mainContent}>

          <section className={styles.contentLeft}>
            <WorkExperience workExperience={workExperience} />
            <Education education={education} />
          </section>

          <aside className={styles.sidebar}>
            <Tools tools={tools} />
            <Publications publications={publications} />
            <Languages languages={languages} />
            <Interests interests={interests} />
          </aside>
        </main>
      </div>
    </div>
  )
}
