export type ParticipantStatus = 
  | 'student' 
  | 'fresh_graduate' 
  | 'professional' 
  | 'freelancer' 
  | 'other'

export type PortfolioStyle = 
  | 'minimal' 
  | 'modern' 
  | 'creative' 
  | 'developer'

export type PortfolioTheme = 
  | 'light' 
  | 'dark' 
  | 'system'

export type AccentColor = 
  | 'blue' 
  | 'purple' 
  | 'green' 
  | 'orange' 
  | 'neutral'

export type AnimationPreference = 
  | 'none' 
  | 'subtle' 
  | 'moderate'

export type PortfolioSection = 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'education' 
  | 'experience' 
  | 'certifications' 
  | 'contact'

export interface EducationEntry {
  school?: string
  program?: string
  year?: string
}

export interface ExperienceEntry {
  id: string
  role: string
  organization?: string
  duration?: string
  summary?: string
}

export interface PortfolioProject {
  id: string
  name: string
  description: string
  goal?: string
  contribution?: string
  technologies: string[]
  keyFeatures?: string[]
  outcome?: string
  repositoryUrl?: string
  liveUrl?: string
}

export interface UserProfile {
  fullName: string
  headline: string
  about?: string
  location?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  websiteUrl?: string
  photoPreference?: 'none' | 'placeholder'
}

export interface BackgroundInfo {
  status: ParticipantStatus
  skills: string[]
  education?: EducationEntry
  experience?: ExperienceEntry[]
  certifications?: string[]
}

export interface DesignPreferences {
  style: PortfolioStyle
  theme: PortfolioTheme
  accentColor: AccentColor
  layout: 'single-page'
  motion: AnimationPreference
  sections: PortfolioSection[]
  ctaLabel?: string
}

export interface PortfolioDraft {
  schemaVersion: 1
  updatedAt: string
  profile: UserProfile
  background: BackgroundInfo
  projects: PortfolioProject[]
  preferences: DesignPreferences
}
