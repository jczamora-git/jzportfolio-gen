import type { PortfolioDraft } from '@/types/portfolio'

export const SAMPLE_PORTFOLIO_DRAFT: PortfolioDraft = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  profile: {
    fullName: 'Alex Morgan',
    headline: 'Aspiring Full-Stack Developer & CS Undergraduate',
    about: 'Passionate computer science student with a focus on building accessible, high-performance web applications and developer tools. Constantly learning modern web standards and DevOps workflows.',
    location: 'Seattle, WA',
    email: 'alex.morgan.dev@example.com',
    githubUrl: 'https://github.com/alexmorgan-dev',
    linkedinUrl: 'https://linkedin.com/in/alexmorgandev',
    websiteUrl: 'https://alexmorgan.dev',
    photoPreference: 'placeholder',
  },
  background: {
    status: 'student',
    skills: ['TypeScript', 'Vue.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git', 'GitHub Actions', 'Figma'],
    education: {
      school: 'Pacific Tech University',
      program: 'B.S. in Computer Science',
      year: 'Expected 2026',
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Frontend Development Intern',
        organization: 'Northwest Digital Lab',
        duration: 'June 2025 - August 2025',
        summary: 'Assisted in building responsive dashboards with Vue 3 and TypeScript. Improved Lighthouse accessibility scores across 4 core client portals.',
      }
    ],
    certifications: [
      'Meta Frontend Developer Professional Certificate',
      'AWS Certified Cloud Practitioner'
    ],
  },
  projects: [
    {
      id: 'proj-1',
      name: 'DevPulse — Developer Activity Hub',
      description: 'A responsive dashboard visualizing open-source contributions, pull requests, and commit trends across GitHub repositories.',
      goal: 'Help open source maintainers track contributor velocity and pull request turnaround times with clean interactive charts.',
      contribution: 'Architected the frontend data visualization components, optimized API response caching, and wrote comprehensive unit tests.',
      technologies: ['TypeScript', 'Vue 3', 'Chart.js', 'Tailwind CSS', 'GitHub REST API'],
      keyFeatures: [
        'Real-time commit cadence heatmaps',
        'Repository comparison tool',
        'Dark & light mode theme toggle with persistent user preferences',
        'Export activity reports to PDF and CSV'
      ],
      outcome: 'Used by 25+ university student teams during the annual hackathon.',
      repositoryUrl: 'https://github.com/alexmorgan-dev/devpulse',
      liveUrl: 'https://devpulse-demo.example.com',
    },
    {
      id: 'proj-2',
      name: 'Campus Pantry Connect',
      description: 'A community resource locator web app connecting university students with campus food pantry inventory and operating hours.',
      goal: 'Reduce food insecurity on campus by providing live inventory status and anonymous reservation slots.',
      contribution: 'Designed the mobile-first user interface in Figma and implemented the frontend client with offline local caching.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Local Storage API'],
      keyFeatures: [
        'Filter pantry locations by dietary needs (vegetarian, gluten-free, halal)',
        'Real-time pantry capacity indicator',
        'Mobile offline mode for spotty campus Wi-Fi'
      ],
      outcome: 'Recognized as Best Community Impact Project at University Capstone Showcase 2025.',
      repositoryUrl: 'https://github.com/alexmorgan-dev/campus-pantry',
      liveUrl: 'https://campus-pantry.example.com',
    }
  ],
  preferences: {
    style: 'modern',
    theme: 'dark',
    accentColor: 'blue',
    layout: 'single-page',
    motion: 'subtle',
    sections: ['about', 'skills', 'projects', 'education', 'experience', 'certifications', 'contact'],
    ctaLabel: 'Explore My Work',
  }
}

export const INITIAL_EMPTY_DRAFT: PortfolioDraft = {
  schemaVersion: 1,
  updatedAt: new Date().toISOString(),
  profile: {
    fullName: '',
    headline: '',
    about: '',
    location: '',
    email: '',
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
    photoPreference: 'placeholder',
  },
  background: {
    status: 'student',
    skills: [],
    education: {
      school: '',
      program: '',
      year: '',
    },
    experience: [],
    certifications: [],
  },
  projects: [],
  preferences: {
    style: 'modern',
    theme: 'light',
    accentColor: 'blue',
    layout: 'single-page',
    motion: 'subtle',
    sections: ['about', 'skills', 'projects', 'education', 'contact'],
    ctaLabel: 'View Projects',
  }
}
