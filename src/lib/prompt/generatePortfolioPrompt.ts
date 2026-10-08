import type { PortfolioDraft, PortfolioProject } from '@/types/portfolio'

export function generatePortfolioPrompt(draft: PortfolioDraft): string {
  const { profile, background, projects, preferences } = draft

  // Format Status label
  const statusLabels: Record<string, string> = {
    student: 'Student / Undergraduate',
    fresh_graduate: 'Fresh Graduate / Recent Alumnus',
    professional: 'Working Professional',
    freelancer: 'Independent Freelancer',
    other: 'Individual Developer',
  }
  const statusDisplay = statusLabels[background.status] || 'Developer'

  // Format Style and Theme descriptions
  const styleDescriptions: Record<string, string> = {
    minimal: 'Minimalist — Clean, spacious typography, high contrast, elegant simplicity, restrained ornamentation.',
    modern: 'Modern Professional — Sleek cards, polished subtle gradients, crisp borders, refined micro-interactions.',
    creative: 'Creative & Dynamic — Bold typography, expressive accent highlights, playful micro-details, engaging visual rhythm.',
    developer: 'Developer-Focused (Terminal/Tech) — Monospace code accents, subtle dark-slate elements, clean syntax-inspired badges.',
  }

  const colorPalettes: Record<string, string> = {
    blue: 'Electric Blue (#3b82f6 primary, #1d4ed8 dark, #eff6ff light background tint)',
    purple: 'Violet / Purple (#8b5cf6 primary, #6d28d9 dark, #f5f3ff light background tint)',
    green: 'Emerald (#10b981 primary, #047857 dark, #ecfdf5 light background tint)',
    orange: 'Sunset Orange (#f97316 primary, #c2410c dark, #fff7ed light background tint)',
    neutral: 'Slate Monochrome (#475569 primary, #0f172a dark, #f8fafc light background tint)',
  }

  // Filter requested sections that have data or are essential
  const activeSections: string[] = []
  
  // Always include hero/introduction
  activeSections.push('1. Hero / Header Section: Headline, name, brief bio, and primary Call-to-Action button.')
  
  if (preferences.sections.includes('about') && profile.about) {
    activeSections.push('2. About Me Section: Personal background and passion.')
  }
  
  if (preferences.sections.includes('skills') && background.skills.length > 0) {
    activeSections.push('3. Skills & Technologies Section: Categorized or badge-based display of verified technical skills.')
  }
  
  if (preferences.sections.includes('projects') && projects.length > 0) {
    activeSections.push('4. Featured Projects Section: Interactive cards showcasing project details, tech stack, and links.')
  } else if (preferences.sections.includes('projects')) {
    activeSections.push('4. Learning Journey / Current Focus Section: Highlighting current experiments, continuous learning, and future project roadmap (no fabricated projects).')
  }

  if (preferences.sections.includes('experience') && background.experience && background.experience.length > 0) {
    activeSections.push('5. Experience Section: Timeline or structured cards of professional/internship roles.')
  }

  if (preferences.sections.includes('education') && background.education && (background.education.school || background.education.program)) {
    activeSections.push('6. Education Section: Academic institution, degree/program, and graduation year.')
  }

  if (preferences.sections.includes('certifications') && background.certifications && background.certifications.length > 0) {
    activeSections.push('7. Certifications & Honors Section: List of verified credentials and achievements.')
  }

  if (preferences.sections.includes('contact')) {
    activeSections.push('8. Contact / Get In Touch Section: Working email link, social profiles, and clean contact card.')
  }

  // Format projects block
  let projectsBlock = ''
  if (projects.length > 0) {
    projectsBlock = projects.map((p: PortfolioProject, idx: number) => {
      const parts: string[] = [
        `### Project ${idx + 1}: ${p.name}`,
        `- **Description**: ${p.description}`,
      ]
      if (p.technologies && p.technologies.length > 0) {
        parts.push(`- **Tech Stack**: ${p.technologies.join(', ')}`)
      }
      if (p.goal) {
        parts.push(`- **Goal / Problem Solved**: ${p.goal}`)
      }
      if (p.contribution) {
        parts.push(`- **Role & Key Contributions**: ${p.contribution}`)
      }
      if (p.keyFeatures && p.keyFeatures.length > 0) {
        parts.push(`- **Key Features**:\n${p.keyFeatures.map(f => `  * ${f}`).join('\n')}`)
      }
      if (p.outcome) {
        parts.push(`- **Outcome / Learning**: ${p.outcome}`)
      }
      if (p.repositoryUrl) {
        parts.push(`- **GitHub Repository**: ${p.repositoryUrl}`)
      }
      if (p.liveUrl) {
        parts.push(`- **Live Demo**: ${p.liveUrl}`)
      }
      return parts.join('\n')
    }).join('\n\n')
  } else {
    projectsBlock = `*No specific projects provided yet.* Instruct the AI to render an engaging "Learning Journey & Tech Stack In Action" section with genuine study milestones rather than inventing fake portfolio repositories.`
  }

  // Format experience block
  let experienceBlock = ''
  if (background.experience && background.experience.length > 0) {
    experienceBlock = background.experience.map((e, idx) => {
      return `${idx + 1}. **${e.role}**${e.organization ? ` at ${e.organization}` : ''}${e.duration ? ` (${e.duration})` : ''}${e.summary ? `\n   - ${e.summary}` : ''}`
    }).join('\n')
  } else {
    experienceBlock = '*(No formal work experience listed. Do not invent any employment history).*'
  }

  // Format education block
  let educationBlock = ''
  if (background.education && (background.education.school || background.education.program || background.education.year)) {
    const eduParts: string[] = []
    if (background.education.program) eduParts.push(`- **Program/Degree**: ${background.education.program}`)
    if (background.education.school) eduParts.push(`- **Institution**: ${background.education.school}`)
    if (background.education.year) eduParts.push(`- **Year / Status**: ${background.education.year}`)
    educationBlock = eduParts.join('\n')
  } else {
    educationBlock = '*(No formal education entry provided. Omit education section if empty).*'
  }

  // Format social links
  const socialLinks: string[] = []
  if (profile.email) socialLinks.push(`- Email: ${profile.email}`)
  if (profile.githubUrl) socialLinks.push(`- GitHub: ${profile.githubUrl}`)
  if (profile.linkedinUrl) socialLinks.push(`- LinkedIn: ${profile.linkedinUrl}`)
  if (profile.websiteUrl) socialLinks.push(`- Personal Website: ${profile.websiteUrl}`)
  const socialLinksBlock = socialLinks.length > 0 ? socialLinks.join('\n') : '*(No direct social/contact URLs provided. Provide clean, editable placeholder links).*'

  // Build the complete prompt string
  const prompt = `Act as a Senior Frontend Developer and UI/UX Designer.

Build a complete, modern, fully responsive, and accessible personal portfolio website based STRICTLY on the user data and specifications provided below.

---

## 1. USER PROFILE & VERIFIED DATA (SOURCE OF TRUTH)

> **CRITICAL ACCURACY INSTRUCTION**:
> Treat all information below as factual data.
> - NEVER fabricate work experience, achievements, metrics, companies, or credentials.
> - NEVER invent fake GitHub repositories, social links, or fake testimonials.
> - If an optional field is absent, omit that section or handle it as instructed below.

- **Full Name**: ${profile.fullName || '[Your Full Name]'}
- **Professional Headline**: ${profile.headline || '[Your Professional Headline]'}
- **Current Status**: ${statusDisplay}
- **Location**: ${profile.location || 'Not specified'}
- **Bio / About Me**: ${profile.about ? profile.about : '*(No custom bio provided. Generate a professional 1-2 sentence introduction derived strictly from the headline and skills above, without inventing factual claims).*'}

### Verified Skills
${background.skills.length > 0 ? background.skills.map(s => `- ${s}`).join('\n') : '- General Web Technologies'}

### Education
${educationBlock}

### Work Experience / Internships
${experienceBlock}

### Projects & Technical Work
${projectsBlock}

${background.certifications && background.certifications.length > 0 ? `### Certifications & Achievements\n${background.certifications.map(c => `- ${c}`).join('\n')}\n` : ''}
### Contact & Social Links
${socialLinksBlock}

---

## 2. DESIGN & AESTHETIC SPECIFICATION

- **Design Style**: ${styleDescriptions[preferences.style] || styleDescriptions.modern}
- **Color Palette**: ${colorPalettes[preferences.accentColor] || colorPalettes.blue}
- **Theme**: ${preferences.theme === 'dark' ? 'Dark Mode (Deep slate #0f172a / #020617 background with high-contrast text and luminous accents)' : preferences.theme === 'light' ? 'Light Mode (Soft off-white / #f8fafc background with crisp dark typography)' : 'Adaptive Theme with easy toggle support'}
- **Layout**: Clean single-page responsive layout with sticky navigation and smooth in-page anchor scrolling.
- **Micro-Interactions**: ${preferences.motion === 'none' ? 'No animations. Instant transitions, strictly respecting prefers-reduced-motion.' : preferences.motion === 'subtle' ? 'Subtle, refined hover transitions (opacity, slight transform) and smooth scrolling.' : 'Modern smooth fade-ins and dynamic hover elevations.'}
- **Typography**: Modern font pairing via Google Fonts (e.g. Plus Jakarta Sans / Inter for headings and body, JetBrains Mono for tech tags).

---

## 3. SECTIONS TO RENDER

Please structure the portfolio with the following sections in logical order:
${activeSections.map(s => `- ${s}`).join('\n')}

---

## 4. STRICT TECHNICAL & DEPLOYMENT CONSTRAINTS

1. **Pure Static Web Stack**:
   - Deliver clean **HTML5**, **CSS3**, and **vanilla JavaScript**.
   - Do NOT use any server-side runtime, Node.js requirement, database, backend API, or npm build step.
   - External dependencies should be minimal and loaded via reputable CDNs if needed (e.g. Google Fonts, Lucide / FontAwesome icons).

2. **GitHub Pages & Subpath Compatibility**:
   - The root file must be \`index.html\`.
   - All stylesheet, script, and image references MUST use relative paths (e.g., \`./styles.css\`, \`./script.js\`, \`./assets/...\`) rather than origin-root paths (\`/styles.css\`).
   - The site must function flawlessly when hosted at either a custom domain or a GitHub Pages subfolder (e.g. \`https://<username>.github.io/<repository>/\`).

3. **Accessibility & Responsive Standards**:
   - 100% mobile-friendly with responsive flexbox/grid layouts and accessible touch targets (minimum 44x44px).
   - Semantic HTML5 elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`).
   - Proper heading hierarchy (exactly one \`<h1>\`, sequential \`<h2>\` and \`<h3>\`).
   - High color contrast ratio (WCAG AA compliant).
   - Full keyboard accessibility and visible focus rings.

---

## 5. DELIVERABLES REQUIRED

Please output the complete, production-ready source code with no truncated sections or placeholders:

1. **\`index.html\`** — The complete HTML structure.
2. **\`styles.css\`** — The complete CSS design system, variables, responsive media queries, and dark/light styling.
3. **\`script.js\`** — Vanilla JS for mobile hamburger menu toggle, smooth anchor navigation, active nav link highlighting, and project filtering (if applicable).
4. **Local Testing & Deployment Instructions**:
   - How to open and preview the files in VS Code with Live Server.
   - Quick guide to pushing the files to a GitHub repository and publishing live via GitHub Pages.

Produce the code now.`

  return prompt
}
