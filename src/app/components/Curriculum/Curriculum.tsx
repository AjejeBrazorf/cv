import type { FC } from 'react'

import type { Education, Language, PersonalInfo, Publication, WorkExperience } from '@/types/curriculum'

import Decoration1 from '../../assets/blob-scene-haikei-2.svg'
import Decoration2 from '../../assets/blob-scene-haikei.svg'

import styles from './Curriculum.module.scss'
import EducationComponent from './Sections/Education'
import Header from './Sections/Header'
import Interests from './Sections/Interests'
import Languages from './Sections/Languages'
import Publications from './Sections/Publications'
import Tools from './Sections/Tools'
import WorkExperienceComponent from './Sections/WorkExperience'

type CurriculumProps = {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
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
        <Header personalInfo={personalInfo} />

        <main className={styles.mainContent}>

          <section className={styles.contentLeft}>
            <WorkExperienceComponent workExperience={workExperience} />
            <EducationComponent education={education} />
          </section>

          <aside className={styles.sidebar}>
            <Publications publications={publications} />
            <Tools tools={tools} />
            <Languages languages={languages} />
            <Interests interests={interests} />
          </aside>

        </main>
        <p className={styles.title}>{personalInfo.title}</p>
        <p className={styles.quote}>{personalInfo.quote}</p>
      </div>
    </div>
  )
}
