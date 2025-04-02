import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

import { fetchCurriculumData } from '@/utils/data'


export async function generateMetadata(): Promise<Metadata> {
  const curriculumData = await fetchCurriculumData()
  
  if (!curriculumData) {
    return {}
  }
  
  const { personalInfo } = curriculumData

  return {
    title: personalInfo.name,
    description: personalInfo.title,
    keywords: ['cv', 'curriculum', personalInfo.name, personalInfo.title],
    openGraph: {
      title: personalInfo.name,
      description: personalInfo.title,
      type: 'profile',
      emails: [personalInfo.email],
      countryName: personalInfo.location,
      images: personalInfo.profilePictureUrl ? [
        {
          alt: personalInfo.name,
          href: personalInfo.profilePictureUrl,
          url: personalInfo.profilePictureUrl,
        }
      ] : []
    }
  }
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        
          {children}
      </body>
    </html>
  )
}

export default RootLayout
