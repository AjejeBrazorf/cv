import React from 'react';
import Image from 'next/image';

import styles from './page.module.scss';
import data from './data.json';
import ProfilePic from './profile.png'
import Background from './background.png'
import Decoration2 from './assets/blob-scene-haikei.svg'
import Decoration1 from './assets/blob-scene-haikei-2.svg'
import type {companyName} from './useLogo';
import { useLogo} from './useLogo'; // Assume this utility function returns the correct logo component based on company name

const Curriculum = () => {
  // Destructuring data for easier access
  const { personal_info, work_experience, education, skills_and_knowledge, publications, languages, interests } = data;
  const { logoComponent } = useLogo();

  return (
      <div className={styles.resume}>
        <Decoration1 />
        <Decoration2 />
        <p className={styles.title}>{data.personal_info.title}</p>
        <p className={styles.quote}>{data.personal_info.quote}</p>
        <header className={styles.header}>
          <Image unoptimized src={ProfilePic.src} alt="profile" width={200} height={200} className={styles.picture} />
          <div>
            <h1 className={styles.name}>{personal_info.name}</h1>
            <div className={styles.contact}>
              <a href={`mailto:${personal_info.email}`} target="_blank" rel="noopener noreferrer"><i className="icon-gg-mail" />{personal_info.email}</a>
              <span><i className={styles['icon-gg-pin']} />{personal_info.location}</span>
              <a href={personal_info.codepen} target="_blank" rel="noopener noreferrer"><i className={styles['icon-gg-link']} />CodePen</a>
              <a href={personal_info.rive} target="_blank" rel="noopener noreferrer"><i className={styles['icon-gg-link']} />Rive</a>
              <a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer"><i className={styles['icon-gg-link']} />LinkedIn</a>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
          <Image unoptimized src={Background.src} width={Background.width} height={Background.height} alt={'background visible only on print page'} className={styles.background} />
          <section className={styles.workExperience}>
            <h2>Work Experience</h2>
            {work_experience.map((job, index) => (
                <article key={index}>
                  <h3>{job.position} at <a href={job.link} target="_blank" rel="noopener noreferrer">{job.company}</a> {logoComponent(job.company as companyName)}</h3>
                  <p>{job.duration.start} - {job.duration.end}</p>
                  <p>{job.location}</p>
                  <h4>Responsibilities</h4>
                  <ul>
                    {job.tasks.map((task, taskIndex) => <li key={taskIndex}>{task}</li>)}
                  </ul>
                </article>
            ))}
          </section>

          <section className={styles.education}>
            <h2>Education</h2>
            {education.map((edu, index) => (
                <article key={index}>
                  <h3>{edu.degree} at {logoComponent(edu.institution as companyName)} <a href={edu.link} target="_blank" rel="noopener noreferrer">{edu.institution}</a></h3>
                  <p>{edu.duration}</p>
                  <p>{edu.location}</p>
                  {edu.final_grade && <p>Final Grade: {edu.final_grade}</p>}
                </article>
            ))}
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.skills}>
              <h2>Tools</h2>
              {Object.entries(skills_and_knowledge).map(([category, skills], index) => (
                  <div key={index}>
                    <h3>{category}</h3>
                    {skills.map((skill, skillIndex) => <span key={skillIndex}>{skill}</span>)}
                  </div>
              ))}
            </div>
            <div className={styles.achievements}>
              <h2>Publications</h2>
              {publications.map((publication, index) => (
                  <div key={index}>
                    <a target='_blank' href={publication.link}><h3>{publication.title}</h3></a>
                    <p>{publication.date}</p>
                    <p>{publication.description}</p>
                  </div>
              ))}
            </div>

            <div className={styles.languages}>
              <h2>Languages</h2>
              <div>
                {Object.entries(languages).map(([language, proficiency], index) => (
                    <span key={index}>{language}: {proficiency}</span>
                ))}
              </div>
            </div>

            <div className={styles.interests}>
              <h2>Interests & Hobbies</h2>
              <div>
                {interests.map((interest, index) => <span key={index}>{interest}</span>)}
              </div>
            </div>
          </aside>
        </main>
      </div>
  );
};

export default Curriculum;
