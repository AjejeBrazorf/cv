import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'
import { Curriculum } from '@/app/components/Curriculum'
import DownloadPageAsPdfButton from '@/app/components/DownloadPageAsPdfButton/DownloadPageAsPdfButton'
import PrintContainer from '@/app/components/PrintContainer/PrintContainer'

export const dynamic = 'force-static'
export const revalidate = 3600

const fetchCurriculumData = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      links(*),
      work_experience(*),
      education(*),
      tools(*),
      publications(*),
      languages(*),
      interests(*)
    `)

  if (error || !data || data.length === 0) {
    return null
  }

  const curriculumData = data[0]

  const workExperience = await Promise.all(
    (curriculumData.work_experience || []).map(async (exp: { icon_url: string; started_at: string | null; ended_at: string | null}) => {
      let newExp = { ...exp, iconUrl: '', time: { start: exp.started_at, end: exp.ended_at } }
      if (exp.icon_url) {
        newExp = { ...newExp, iconUrl: `/api/image/logos/${exp.icon_url}` }
      }
      return newExp
    })
  )

  const education = await Promise.all(
    (curriculumData.education || []).map(async (exp: { icon_url: string; started_at: string | null; ended_at: string | null}) => {
      console.log(exp.started_at, exp.ended_at)
      let newExp = { ...exp, iconUrl: '', time: { start: exp.started_at, end: exp.ended_at } }
      if (exp.icon_url) {
        newExp = { ...newExp, iconUrl:`/api/image/logos/${exp.icon_url}` }
      }
      return newExp
    })
  )

  let profilePictureUrl = null
  if (curriculumData.picture_url) {
    profilePictureUrl = `/api/image/profile/${curriculumData.picture_url}`
  }

  const tools = (curriculumData.tools || []).reduce((acc: Record<string, string[]>, curr: { category: string; tool: string }) => {
    const { category, tool } = curr
    if (!acc[category]) acc[category] = []
    acc[category].push(tool)
    return acc
  }, {})

  const interests = (curriculumData.interests || []).map(({ interest }: { interest: string }) => interest)

  return {
    personalInfo: { ...curriculumData, profilePictureUrl },
    workExperience,
    education,
    tools,
    publications: curriculumData.publications || [],
    languages: curriculumData.languages || [],
    interests,
  }
}

const Page = async ()=> {
  const curriculum = await fetchCurriculumData()

  if(!curriculum) {
    return <span> there was an error </span>
  }

  return(
  <>
    <PrintContainer>
      <Curriculum {...curriculum} />
    </PrintContainer>
    <DownloadPageAsPdfButton />
  </>)
}

export default Page
