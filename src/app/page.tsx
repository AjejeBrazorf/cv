import { Curriculum } from '@/app/components/Curriculum'
import { fetchCurriculumData } from '@/utils/data'

export const dynamic = 'force-static'
export const revalidate = 3600

const Home = async () => {
  const curriculumData = await fetchCurriculumData()

  if (!curriculumData) {
    return null
  }

  return <Curriculum {...curriculumData} />
}

export default Home
