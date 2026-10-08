export interface SkillCategoryGroup {
  category: string
  skills: string[]
}

export const POPULAR_SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    category: 'Programming Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Go', 'Rust', 'Ruby', 'HTML5', 'CSS3']
  },
  {
    category: 'Frontend Development',
    skills: ['Vue.js', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Sass', 'Svelte', 'Redux', 'Pinia']
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Django', 'FastAPI', 'Spring Boot', 'Laravel', 'REST APIs', 'GraphQL']
  },
  {
    category: 'Databases & Cloud',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase', 'Redis', 'Docker', 'AWS']
  },
  {
    category: 'Tools & Workflow',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'VS Code', 'Figma', 'Postman', 'Vercel', 'Linux', 'Jest / Vitest']
  }
]

export const ALL_SUGGESTED_SKILLS = POPULAR_SKILL_CATEGORIES.flatMap(cat => cat.skills)
