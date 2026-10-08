import { describe, it, expect } from 'vitest'
import { generatePortfolioPrompt } from '@/lib/prompt/generatePortfolioPrompt'
import { SAMPLE_PORTFOLIO_DRAFT } from '@/data/sampleProfile'
import type { PortfolioDraft } from '@/types/portfolio'

describe('Prompt Generator Engine', () => {
  it('generates a complete prompt with full sample input', () => {
    const prompt = generatePortfolioPrompt(SAMPLE_PORTFOLIO_DRAFT)

    expect(prompt).toContain('Alex Morgan')
    expect(prompt).toContain('Aspiring Full-Stack Developer & CS Undergraduate')
    expect(prompt).toContain('DevPulse — Developer Activity Hub')
    expect(prompt).toContain('Campus Pantry Connect')
    expect(prompt).toContain('Pacific Tech University')
    expect(prompt).toContain('TypeScript')
    expect(prompt).toContain('GitHub Pages')
    expect(prompt).toContain('index.html')
    expect(prompt).toContain('styles.css')
    expect(prompt).toContain('script.js')
    expect(prompt).toContain('NEVER fabricate work experience')
  })

  it('handles missing optional information gracefully without hallucinating claims', () => {
    const minimalDraft: PortfolioDraft = {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Jordan Lee',
        headline: 'Junior Web Enthusiast',
        about: '',
        location: '',
        email: '',
        githubUrl: '',
        linkedinUrl: '',
        websiteUrl: '',
        photoPreference: 'none',
      },
      background: {
        status: 'student',
        skills: ['HTML5', 'CSS3', 'JavaScript'],
        education: { school: '', program: '', year: '' },
        experience: [],
        certifications: [],
      },
      projects: [],
      preferences: {
        style: 'minimal',
        theme: 'dark',
        accentColor: 'neutral',
        layout: 'single-page',
        motion: 'none',
        sections: ['about', 'skills', 'projects', 'contact'],
      },
    }

    const prompt = generatePortfolioPrompt(minimalDraft)

    expect(prompt).toContain('Jordan Lee')
    expect(prompt).toContain('Junior Web Enthusiast')
    expect(prompt).toContain('HTML5')
    expect(prompt).toContain('CSS3')
    expect(prompt).toContain('JavaScript')
    
    // Check that missing experience doesn't invent fake companies
    expect(prompt).toContain('No formal work experience listed. Do not invent any employment history')
    
    // Check that missing projects produce a learning journey fallback
    expect(prompt).toContain('No specific projects provided yet')
    expect(prompt).toContain('Learning Journey & Tech Stack In Action')
  })

  it('formats multiple projects correctly with their individual tech stacks and links', () => {
    const multiProjectDraft: PortfolioDraft = {
      ...SAMPLE_PORTFOLIO_DRAFT,
      projects: [
        {
          id: 'p1',
          name: 'TaskMaster Pro',
          description: 'A kanban board application',
          technologies: ['Vue 3', 'Pinia'],
          repositoryUrl: 'https://github.com/user/taskmaster',
          liveUrl: 'https://taskmaster.app',
        },
        {
          id: 'p2',
          name: 'WeatherWise',
          description: 'Real-time weather radar client',
          technologies: ['TypeScript', 'Tailwind'],
        },
      ],
    }

    const prompt = generatePortfolioPrompt(multiProjectDraft)

    expect(prompt).toContain('### Project 1: TaskMaster Pro')
    expect(prompt).toContain('https://github.com/user/taskmaster')
    expect(prompt).toContain('https://taskmaster.app')
    expect(prompt).toContain('### Project 2: WeatherWise')
    expect(prompt).toContain('TypeScript, Tailwind')
  })

  it('incorporates custom design preferences correctly into the prompt constraints', () => {
    const customDesignDraft: PortfolioDraft = {
      ...SAMPLE_PORTFOLIO_DRAFT,
      preferences: {
        style: 'developer',
        theme: 'dark',
        accentColor: 'green',
        layout: 'single-page',
        motion: 'none',
        sections: ['skills', 'projects', 'contact'],
      },
    }

    const prompt = generatePortfolioPrompt(customDesignDraft)

    expect(prompt).toContain('Developer-Focused (Terminal/Tech)')
    expect(prompt).toContain('Emerald')
    expect(prompt).toContain('Dark Mode')
    expect(prompt).toContain('strictly respecting prefers-reduced-motion')
  })
})
