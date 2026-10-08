import type { PortfolioDraft } from '@/types/portfolio'
import { generatePortfolioPrompt } from './generatePortfolioPrompt'

export function generatePortfolioBriefMarkdown(draft: PortfolioDraft): string {
  const { profile, background, projects, preferences } = draft
  
  return `# Portfolio Brief — ${profile.fullName || 'Unnamed Portfolio'}
Generated on: ${new Date().toLocaleDateString()}

## Personal Profile
- **Full Name**: ${profile.fullName}
- **Headline**: ${profile.headline}
- **Location**: ${profile.location || 'N/A'}
- **Contact Email**: ${profile.email || 'N/A'}
- **GitHub**: ${profile.githubUrl || 'N/A'}
- **LinkedIn**: ${profile.linkedinUrl || 'N/A'}
- **Website**: ${profile.websiteUrl || 'N/A'}

## Biography
${profile.about || 'N/A'}

## Background & Skills
- **Status**: ${background.status}
- **Skills**: ${background.skills.join(', ')}

${background.education?.school || background.education?.program ? `### Education
- **Degree/Program**: ${background.education.program || 'N/A'}
- **Institution**: ${background.education.school || 'N/A'}
- **Year**: ${background.education.year || 'N/A'}
` : ''}

${background.experience && background.experience.length > 0 ? `### Experience
${background.experience.map(e => `- **${e.role}** at ${e.organization || 'Organization'} (${e.duration || 'Duration'}): ${e.summary || ''}`).join('\n')}
` : ''}

${projects.length > 0 ? `## Projects
${projects.map((p, i) => `### ${i + 1}. ${p.name}
- **Description**: ${p.description}
- **Technologies**: ${p.technologies.join(', ')}
${p.goal ? `- **Goal**: ${p.goal}` : ''}
${p.contribution ? `- **Contribution**: ${p.contribution}` : ''}
${p.outcome ? `- **Outcome**: ${p.outcome}` : ''}
${p.repositoryUrl ? `- **Repo**: ${p.repositoryUrl}` : ''}
${p.liveUrl ? `- **Live**: ${p.liveUrl}` : ''}
`).join('\n')}
` : ''}

## Design Preferences
- **Style**: ${preferences.style}
- **Theme**: ${preferences.theme}
- **Accent Color**: ${preferences.accentColor}
- **Motion**: ${preferences.motion}
- **Requested Sections**: ${preferences.sections.join(', ')}
`
}

export function downloadMarkdownFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename.endsWith('.md') ? filename : `${filename}.md`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadPromptMarkdown(draft: PortfolioDraft): void {
  const promptText = generatePortfolioPrompt(draft)
  const filename = `${draft.profile.fullName ? draft.profile.fullName.toLowerCase().replace(/\s+/g, '-') : 'portfolio'}-prompt.md`
  downloadMarkdownFile(filename, promptText)
}

export function downloadBriefMarkdown(draft: PortfolioDraft): void {
  const briefText = generatePortfolioBriefMarkdown(draft)
  const filename = `${draft.profile.fullName ? draft.profile.fullName.toLowerCase().replace(/\s+/g, '-') : 'portfolio'}-brief.md`
  downloadMarkdownFile(filename, briefText)
}
