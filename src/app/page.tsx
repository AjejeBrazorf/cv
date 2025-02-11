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

  const organizedTools = (curriculumData.tools || []).reduce((acc: Record<string, string[]>, curr: { category: string; tool: string }) => {
    const { category, tool } = curr
    if (!acc[category]) acc[category] = []
    acc[category].push(tool)
    return acc
  }, {})

  const interests = (curriculumData.interests || []).map(({ interest }: { interest: string }) => interest)

  return {
    personalInfo: { ...curriculumData },
    workExperience: curriculumData.work_experience || [],
    education: curriculumData.education || [],
    tools: organizedTools,
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
