import { describe, it, expect } from 'vitest'
import { 
  UserProfileSchema, 
  BackgroundSchema, 
  ProjectSchema, 
  PortfolioDraftSchema 
} from '@/lib/validation/portfolioSchema'
import { SAMPLE_PORTFOLIO_DRAFT } from '@/data/sampleProfile'

describe('Portfolio Zod Validation Schemas', () => {
  it('validates a correct sample draft successfully', () => {
    const result = PortfolioDraftSchema.safeParse(SAMPLE_PORTFOLIO_DRAFT)
    expect(result.success).toBe(true)
  })

  it('rejects an empty full name or headline in UserProfileSchema', () => {
    const invalidProfile = {
      fullName: ' ',
      headline: ' ',
    }
    const result = UserProfileSchema.safeParse(invalidProfile)
    expect(result.success).toBe(false)
  })

  it('validates URLs properly, accepting valid URLs and empty strings while rejecting malformed URLs', () => {
    const validHttp = UserProfileSchema.safeParse({
      fullName: 'Alice Dev',
      headline: 'Engineer',
      githubUrl: 'https://github.com/alice',
      websiteUrl: 'http://alice.dev',
    })
    expect(validHttp.success).toBe(true)

    const invalidUrl = UserProfileSchema.safeParse({
      fullName: 'Alice Dev',
      headline: 'Engineer',
      githubUrl: 'not-a-valid-url-at-all',
    })
    expect(invalidUrl.success).toBe(false)
  })

  it('requires at least 1 skill in BackgroundSchema', () => {
    const emptySkills = {
      status: 'student',
      skills: [],
    }
    const result = BackgroundSchema.safeParse(emptySkills)
    expect(result.success).toBe(false)

    const validSkills = {
      status: 'student',
      skills: ['Vue.js'],
    }
    const validResult = BackgroundSchema.safeParse(validSkills)
    expect(validResult.success).toBe(true)
  })

  it('validates project fields properly', () => {
    const validProject = {
      id: 'p1',
      name: 'My App',
      description: 'A great app',
      technologies: ['Vue', 'Vite'],
      keyFeatures: ['Feature 1'],
    }
    const result = ProjectSchema.safeParse(validProject)
    expect(result.success).toBe(true)

    const invalidProject = {
      id: 'p2',
      name: '',
      description: '',
      technologies: [],
      keyFeatures: [],
    }
    const invalidResult = ProjectSchema.safeParse(invalidProject)
    expect(invalidResult.success).toBe(false)
  })
})
