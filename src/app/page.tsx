import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'
import { Curriculum } from '@/app/components/Curriculum'

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
    (curriculumData.work_experience || []).map(async (exp: { icon_url: string}) => {
      if (exp.icon_url) {
        const { data: { publicUrl } } = supabase
          .storage
          .from('logos')
          .getPublicUrl(exp.icon_url)
        return { ...exp, iconUrl: publicUrl }
      }
      return exp
    })
  )

  const education = await Promise.all(
    (curriculumData.education || []).map(async (exp: { icon_url: string}) => {
      console.log(exp.icon_url)
      if (exp.icon_url) {
        const { data: { publicUrl } } = supabase
          .storage
          .from('logos')
          .getPublicUrl(exp.icon_url)
        return { ...exp, iconUrl: publicUrl }
      }
      return exp
    })
  )

  let profilePictureUrl = curriculumData.picture_url
  if (profilePictureUrl) {
    const { data: { publicUrl } } = supabase
      .storage
      .from('profile')
      .getPublicUrl(profilePictureUrl)
    profilePictureUrl = publicUrl
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

  return <Curriculum {...curriculum} />
}

export default Page
