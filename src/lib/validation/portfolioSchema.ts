import { z } from 'zod'

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      if (!val || val === '') return true
      try {
        const url = new URL(val)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch {
        return false
      }
    },
    { message: 'Must be a valid URL starting with https:// or http://' }
  )

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      if (!val || val === '') return true
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    },
    { message: 'Must be a valid email address' }
  )

export const UserProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  headline: z
    .string()
    .trim()
    .min(2, 'Professional headline must be at least 2 characters')
    .max(100, 'Headline cannot exceed 100 characters'),
  about: z.string().max(1000, 'About me cannot exceed 1,000 characters').optional(),
  location: z.string().max(100, 'Location cannot exceed 100 characters').optional(),
  email: optionalEmail,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  websiteUrl: optionalUrl,
  photoPreference: z.enum(['none', 'placeholder']).optional().default('placeholder'),
})

export const EducationSchema = z.object({
  school: z.string().max(150).optional(),
  program: z.string().max(150).optional(),
  year: z.string().max(50).optional(),
})

export const ExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string().min(1, 'Role title is required'),
  organization: z.string().optional(),
  duration: z.string().optional(),
  summary: z.string().max(500, 'Summary cannot exceed 500 characters').optional(),
})

export const BackgroundSchema = z.object({
  status: z.enum(['student', 'fresh_graduate', 'professional', 'freelancer', 'other']),
  skills: z.array(z.string().trim()).min(1, 'Please add or select at least one skill'),
  education: EducationSchema.optional(),
  experience: z.array(ExperienceItemSchema).optional().default([]),
  certifications: z.array(z.string().trim()).optional().default([]),
})

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Project name is required').max(100),
  description: z.string().trim().min(1, 'Short description is required').max(300),
  goal: z.string().max(500).optional(),
  contribution: z.string().max(500).optional(),
  technologies: z.array(z.string()).default([]),
  keyFeatures: z.array(z.string()).default([]),
  outcome: z.string().max(500).optional(),
  repositoryUrl: optionalUrl,
  liveUrl: optionalUrl,
})

export const DesignPreferencesSchema = z.object({
  style: z.enum(['minimal', 'modern', 'creative', 'developer']),
  theme: z.enum(['light', 'dark', 'system']),
  accentColor: z.enum(['blue', 'purple', 'green', 'orange', 'neutral']),
  layout: z.literal('single-page'),
  motion: z.enum(['none', 'subtle', 'moderate']),
  sections: z.array(
    z.enum(['about', 'skills', 'projects', 'education', 'experience', 'certifications', 'contact'])
  ),
  ctaLabel: z.string().max(50).optional(),
})

export const PortfolioDraftSchema = z.object({
  schemaVersion: z.literal(1),
  updatedAt: z.string(),
  profile: UserProfileSchema,
  background: BackgroundSchema,
  projects: z.array(ProjectSchema).max(10, 'Maximum 10 projects allowed'),
  preferences: DesignPreferencesSchema,
})

export type ValidatedPortfolioDraft = z.infer<typeof PortfolioDraftSchema>
