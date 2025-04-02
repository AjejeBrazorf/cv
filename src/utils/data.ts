import type { CurriculumData } from '@/types/curriculum'

export async function fetchCurriculumData(): Promise<CurriculumData | null> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CV_GIST_URL!,
      {
        cache: 'force-cache'
      } 
    )
    if (!response.ok) {
      throw new Error('Failed to fetch CV data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching CV data:', error)
    return null
  }
} 