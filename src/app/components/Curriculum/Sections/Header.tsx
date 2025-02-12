import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'

import icons from '../../../style/icons.module.scss'

import styles from './Header.module.scss'

interface Link {
  name: string
  url: string
}

export interface PersonalInfo {
  name: string
  email: string
  location: string
  title: string
  quote: string
  links: Link[]
  profilePictureUrl: string
}

interface HeaderProps {
  personalInfo: PersonalInfo
}

const Header: FC<HeaderProps> = ({ personalInfo }) => {
  return (
    <div className={styles.headerContainer}>
    <header className={styles.headerInner}>
      <Image className={styles.picture} priority src={personalInfo.profilePictureUrl} alt="profile" width={200} height={200} />
      <div className={styles.content}>
        <h1 className={styles.name}>{personalInfo.name}</h1>
        <div className={styles.contact}>
          <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer"><i className={icons['icon-gg-mail']} />{personalInfo.email}</a>
          <span className={styles.location}><i className={icons['icon-gg-pin']} />{personalInfo.location}</span>
          <div className={styles.links}>
            {personalInfo.links.map((link, index) => <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"><i className={icons['icon-gg-link']} />{link.name}</a>)}
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header
