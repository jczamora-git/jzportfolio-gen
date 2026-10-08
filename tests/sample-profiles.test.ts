import { describe, it, expect } from 'vitest'
import { SAMPLE_PROFILES } from '@/data/sampleProfiles'
import { PortfolioDraftSchema } from '@/lib/validation/portfolioSchema'
import { generatePortfolioPrompt } from '@/lib/prompt/generatePortfolioPrompt'

describe('Sample Profiles Suite (Phase 2)', () => {
  it('contains exactly 5 distinct sample profiles', () => {
    expect(SAMPLE_PROFILES.length).toBe(5)
    const ids = SAMPLE_PROFILES.map(s => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(5)
  })

  it('validates every sample profile successfully against the Zod schema', () => {
    SAMPLE_PROFILES.forEach((sample) => {
      const result = PortfolioDraftSchema.safeParse(sample.draft)
      if (!result.success) {
        console.error(`Validation failed for sample: ${sample.name}`, result.error)
      }
      expect(result.success).toBe(true)
    })
  })

  it('generates a rich deterministic prompt for each of the 5 sample profiles', () => {
    SAMPLE_PROFILES.forEach((sample) => {
      const prompt = generatePortfolioPrompt(sample.draft)
      expect(prompt).toContain(sample.draft.profile.fullName)
      expect(prompt).toContain(sample.draft.profile.headline)
      expect(prompt).toContain('HTML5')
      expect(prompt).toContain('CSS3')
      expect(prompt).toContain('vanilla JavaScript')
      expect(prompt).toContain('GitHub Pages')
      expect(prompt).toContain('NEVER fabricate work experience')
      
      // Ensure skills are present
      sample.draft.background.skills.forEach(skill => {
        expect(prompt).toContain(skill)
      })

      // Ensure projects are present if defined
      sample.draft.projects.forEach(proj => {
        expect(prompt).toContain(proj.name)
        expect(prompt).toContain(proj.description)
      })
    })
  })
})
