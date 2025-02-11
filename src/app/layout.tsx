import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

const fetchMetadata = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *
    `)
  if (error || !data || data.length === 0) {
    return { }
  }
  const curriculumData = data[0]
  let profilePictureUrl = curriculumData.picture_url
  if (profilePictureUrl) {
    const { data: { publicUrl } } = supabase
      .storage
      .from('profile')
      .getPublicUrl(profilePictureUrl)
    profilePictureUrl = publicUrl
  }

  return {
    title: curriculumData.name,
    description: curriculumData.title,
    keywords: ['cv', 'curriculum', curriculumData.name, curriculumData.title],
    openGraph: {
      title: curriculumData.name,
      description: curriculumData.title,
      type: 'profile',
      emails: [curriculumData.email],
      countryName: curriculumData.location,
      images: [
        {
          alt: curriculumData.name,
          href: profilePictureUrl,
          url: profilePictureUrl,
        }
      ]
    }
  } as Metadata
}

export const metadata: Metadata = await fetchMetadata()

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
