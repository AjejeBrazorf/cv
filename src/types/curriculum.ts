export interface Link {
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
  profilePictureUrl: string | null
}

export interface Time {
  start: string | null
  end: string | null
}

export interface WorkExperience {
  position: string
  company: string
  link: string
  time: Time
  location: string
  tasks: string[]
  iconUrl: string | null
}

export interface Education {
  degree: string
  institution: string
  link: string
  time: Time
  location: string
  iconUrl: string | null
  final_grade: string | null
}

export interface Publication {
  title: string
  link: string
  date: string
  description: string
}

export interface Language {
  language: string
  level: string
}

export interface CurriculumData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  tools: Record<string, string[]>
  publications: Publication[]
  languages: Language[]
  interests: string[]
} 