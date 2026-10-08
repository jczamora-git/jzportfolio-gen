import type { PortfolioDraft } from '@/types/portfolio'

export interface SampleProfileMeta {
  id: string
  name: string
  role: string
  category: string
  focus: string
  summary: string
  accent: string
  draft: PortfolioDraft
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
    accentColor: 'purple',
    layout: 'single-page',
    motion: 'subtle',
    sections: ['about', 'skills', 'projects', 'education', 'contact'],
    ctaLabel: 'View Projects',
  }
}

export const SAMPLE_PROFILES: SampleProfileMeta[] = [
  // SAMPLE 1 — STUDENT DEVELOPER
  {
    id: 'student-alex',
    name: 'Alex Morgan',
    role: 'Computer Science Student',
    category: 'Student Developer',
    focus: 'Frontend Development & UI Engineering',
    summary: 'A beginner-friendly frontend student portfolio showcasing coursework and interactive apps.',
    accent: 'purple',
    draft: {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Alex Morgan',
        headline: 'Aspiring Frontend Developer & CS Student',
        about: 'Computer science undergraduate passionate about crafting accessible, high-performance web applications. Focused on modern JavaScript, Vue 3, and component-driven design systems.',
        location: 'Seattle, WA',
        email: 'alex.morgan.dev@example.com',
        githubUrl: 'https://github.com/alexmorgan-dev',
        linkedinUrl: 'https://linkedin.com/in/alexmorgandev',
        websiteUrl: 'https://alexmorgan.dev',
        photoPreference: 'placeholder',
      },
      background: {
        status: 'student',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Git', 'Figma'],
        education: {
          school: 'Pacific Tech University',
          program: 'B.S. in Computer Science',
          year: 'Expected 2026',
        },
        experience: [
          {
            id: 'exp-s1',
            role: 'Peer Web Development Tutor',
            organization: 'Computer Science Student Learning Center',
            duration: 'Sept 2024 - Present',
            summary: 'Mentored first-year students in web fundamentals, Git version control, and responsive CSS layout techniques.',
          }
        ],
        certifications: [
          'Meta Frontend Developer Specialization',
          'Responsive Web Design Certification'
        ],
      },
      projects: [
        {
          id: 'proj-s1',
          name: 'DevPulse — Developer Activity Hub',
          description: 'A responsive dashboard visualizing open-source contributions and commit trends across GitHub repositories.',
          goal: 'Help student developers track their learning progress and open-source contribution velocity.',
          contribution: 'Designed the mobile-friendly user interface, integrated REST APIs, and implemented dark/light theme switching.',
          technologies: ['TypeScript', 'Vue 3', 'Tailwind CSS', 'Chart.js', 'GitHub API'],
          keyFeatures: [
            'Real-time commit cadence heatmaps',
            'Theme toggle with persistent local preferences',
            'Repository comparison view'
          ],
          outcome: 'Adopted by 30+ students during the annual campus hackathon.',
          repositoryUrl: 'https://github.com/alexmorgan-dev/devpulse',
          liveUrl: 'https://devpulse-demo.example.com',
        },
        {
          id: 'proj-s2',
          name: 'TaskFlow — Minimalist Study Planner',
          description: 'A clean, distraction-free task management web app designed for student assignment deadlines.',
          goal: 'Provide a lightweight task scheduler without complicated team project overhead.',
          contribution: 'Built full frontend client with drag-and-drop task ordering and local storage synchronization.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage API'],
          keyFeatures: [
            'Priority tags and deadline notifications',
            'Zero account signup required — 100% offline ready',
            'Keyboard navigation shortcuts'
          ],
          outcome: 'Created as final project for Web Development course with highest class score.',
          repositoryUrl: 'https://github.com/alexmorgan-dev/taskflow',
          liveUrl: 'https://taskflow-demo.example.com',
        }
      ],
      preferences: {
        style: 'minimal',
        theme: 'light',
        accentColor: 'purple',
        layout: 'single-page',
        motion: 'subtle',
        sections: ['about', 'skills', 'projects', 'education', 'certifications', 'contact'],
        ctaLabel: 'Explore My Work',
      }
    }
  },

  // SAMPLE 2 — FRESH GRADUATE
  {
    id: 'grad-jamie',
    name: 'Jamie Reyes',
    role: 'Recent IT Graduate',
    category: 'Fresh Graduate',
    focus: 'Full-Stack Web Development & APIs',
    summary: 'A full-stack graduate portfolio highlighting database-backed systems and internship experience.',
    accent: 'blue',
    draft: {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Jamie Reyes',
        headline: 'Full-Stack Developer | Recent Information Technology Graduate',
        about: 'Recent IT graduate with hands-on experience building full-stack web applications, RESTful APIs, and database architectures. Dedicated to clean code, test-driven development, and cloud deployments.',
        location: 'Austin, TX',
        email: 'jamie.reyes.it@example.com',
        githubUrl: 'https://github.com/jamiereyes-dev',
        linkedinUrl: 'https://linkedin.com/in/jamiereyes-dev',
        websiteUrl: 'https://jamiereyes.dev',
        photoPreference: 'placeholder',
      },
      background: {
        status: 'fresh_graduate',
        skills: ['JavaScript', 'TypeScript', 'Node.js', 'Vue.js', 'Express.js', 'PostgreSQL', 'REST APIs', 'Git', 'Docker', 'Tailwind CSS'],
        education: {
          school: 'Metro State University',
          program: 'B.S. in Information Technology',
          year: 'Class of 2025',
        },
        experience: [
          {
            id: 'exp-g1',
            role: 'Full-Stack Engineering Intern',
            organization: 'CloudBridge Solutions',
            duration: 'June 2024 - November 2024',
            summary: 'Developed backend API endpoints with Node.js and PostgreSQL. Optimized SQL queries to reduce average endpoint latency by 28%.',
          }
        ],
        certifications: [
          'AWS Certified Cloud Practitioner',
          'PostgreSQL Essential Training'
        ],
      },
      projects: [
        {
          id: 'proj-g1',
          name: 'StockFlow — Inventory Management Portal',
          description: 'A full-stack inventory control application with real-time stock alert thresholds and role-based permissions.',
          goal: 'Streamline warehouse inventory tracking for small-to-medium retail distribution.',
          contribution: 'Architected relational database schema in PostgreSQL and built responsive admin dashboards.',
          technologies: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Vue 3', 'Tailwind CSS'],
          keyFeatures: [
            'Low-stock email notifications and automated restock triggers',
            'CSV data import and export pipeline',
            'Audit log tracking for every stock adjustment'
          ],
          outcome: 'Served as senior capstone project and received University Innovation Award.',
          repositoryUrl: 'https://github.com/jamiereyes-dev/stockflow',
          liveUrl: 'https://stockflow-demo.example.com',
        },
        {
          id: 'proj-g2',
          name: 'CampusConnect — Student Event Hub',
          description: 'A campus event management portal connecting student organizations with attendee registrations.',
          goal: 'Centralize fragmented campus club announcements into an interactive verified event feed.',
          contribution: 'Engineered REST API endpoints and user authentication session management.',
          technologies: ['JavaScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
          keyFeatures: [
            'Category and date-range event filtering',
            'iCalendar (.ics) event export integration',
            'Mobile-responsive ticket registration view'
          ],
          outcome: 'Piloted with 12 campus organizations during orientation week.',
          repositoryUrl: 'https://github.com/jamiereyes-dev/campus-connect',
          liveUrl: 'https://campus-connect.example.com',
        }
      ],
      preferences: {
        style: 'modern',
        theme: 'dark',
        accentColor: 'purple',
        layout: 'single-page',
        motion: 'subtle',
        sections: ['about', 'skills', 'projects', 'education', 'experience', 'certifications', 'contact'],
        ctaLabel: 'View Portfolio Projects',
      }
    }
  },

  // SAMPLE 3 — UI/UX DESIGNER
  {
    id: 'designer-taylor',
    name: 'Taylor Santos',
    role: 'Aspiring UI/UX Designer',
    category: 'Product Designer',
    focus: 'User Experience, Design Systems & Interaction Design',
    summary: 'A design-focused portfolio emphasizing in-depth case studies, wireframing, and user research.',
    accent: 'purple',
    draft: {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Taylor Santos',
        headline: 'Product Designer & UI/UX Specialist',
        about: 'Human-centered product designer passionate about transforming complex digital workflows into intuitive, accessible user experiences. Skilled in user research, wireframing, high-fidelity prototyping, and design systems.',
        location: 'San Francisco, CA',
        email: 'taylor.santos.design@example.com',
        githubUrl: '',
        linkedinUrl: 'https://linkedin.com/in/taylorsantos-design',
        websiteUrl: 'https://taylorsantos.design',
        photoPreference: 'placeholder',
      },
      background: {
        status: 'other',
        skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Rapid Prototyping', 'Design Systems', 'User Research', 'Usability Testing', 'HTML5', 'CSS3'],
        education: {
          school: 'Institute of Interactive Arts',
          program: 'Diploma in Digital Product Design',
          year: '2024',
        },
        experience: [
          {
            id: 'exp-d1',
            role: 'Junior UI Designer (Contract)',
            organization: 'Nexus Creative Studio',
            duration: 'Jan 2024 - Aug 2024',
            summary: 'Created scalable design system component libraries in Figma and conducted 15+ remote usability testing sessions.',
          }
        ],
        certifications: [
          'Google UX Design Professional Certificate',
          'Nielsen Norman Group UX Basics'
        ],
      },
      projects: [
        {
          id: 'proj-d1',
          name: 'AuraPay — Mobile Wallet UX Redesign',
          description: 'A comprehensive UX case study and mobile banking redesign focused on simplifying peer-to-peer transfers.',
          goal: 'Reduce checkout friction and improve accessibility contrast for senior smartphone users.',
          contribution: 'Conducted user interviews, created journey maps, paper wireframes, and interactive Figma prototypes.',
          technologies: ['Figma', 'FigJam', 'User Research', 'Design Systems', 'Prototyping'],
          keyFeatures: [
            'Simplified 3-tap bill split workflow',
            'High-contrast accessible color palette (WCAG AAA compliant)',
            'Comprehensive design system token library'
          ],
          outcome: 'Usability testing demonstrated a 42% reduction in transfer completion time.',
          repositoryUrl: '',
          liveUrl: 'https://figma.com/@taylorsantos/aurapay-case-study',
        },
        {
          id: 'proj-d2',
          name: 'EduPortal — Student Dashboard Experience',
          description: 'End-to-end interface design and interactive prototype for a modern university learning management system.',
          goal: 'Replace cluttered legacy university course portals with a clean, prioritized daily overview.',
          contribution: 'Led information architecture restructuring and responsive design specifications.',
          technologies: ['Figma', 'Information Architecture', 'Prototyping'],
          keyFeatures: [
            'Upcoming assignment radar widget',
            'Dark and light mode UI token specifications',
            'Cross-platform desktop and tablet responsive grids'
          ],
          outcome: 'Featured in the Annual Interactive Design Student Showcase 2024.',
          repositoryUrl: '',
          liveUrl: 'https://taylorsantos.design/projects/eduportal',
        }
      ],
      preferences: {
        style: 'creative',
        theme: 'light',
        accentColor: 'purple',
        layout: 'single-page',
        motion: 'subtle',
        sections: ['about', 'skills', 'projects', 'education', 'experience', 'certifications', 'contact'],
        ctaLabel: 'View UX Case Studies',
      }
    }
  },

  // SAMPLE 4 — DATA ANALYST
  {
    id: 'data-jordan',
    name: 'Jordan Cruz',
    role: 'Junior Data Analyst',
    category: 'Data Analyst',
    focus: 'Data Storytelling, SQL & Business Intelligence',
    summary: 'An analytics portfolio emphasizing actionable metrics, SQL pipelines, and clean dashboards.',
    accent: 'neutral',
    draft: {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Jordan Cruz',
        headline: 'Junior Data Analyst | Business Intelligence & SQL Specialist',
        about: 'Data analyst dedicated to turning messy data into clear, actionable business insights. Experienced in Python data pipelines, relational SQL querying, statistical analysis, and interactive dashboard storytelling.',
        location: 'Chicago, IL',
        email: 'jordan.cruz.data@example.com',
        githubUrl: 'https://github.com/jordancruz-data',
        linkedinUrl: 'https://linkedin.com/in/jordancruzdata',
        websiteUrl: 'https://jordancruz.dev',
        photoPreference: 'placeholder',
      },
      background: {
        status: 'professional',
        skills: ['Python', 'SQL', 'PostgreSQL', 'Pandas', 'Power BI', 'Excel (Advanced)', 'Data Visualization', 'Tableau', 'Git'],
        education: {
          school: 'State University of Illinois',
          program: 'B.S. in Applied Statistics & Informatics',
          year: '2024',
        },
        experience: [
          {
            id: 'exp-da1',
            role: 'Data Analytics Associate',
            organization: 'Summit Retail Metrics',
            duration: 'March 2024 - Present',
            summary: 'Built automated Power BI dashboards for regional sales executives and automated weekly reporting ETL scripts in Python.',
          }
        ],
        certifications: [
          'Microsoft Certified: Power BI Data Analyst Associate',
          'Google Advanced Data Analytics Certificate'
        ],
      },
      projects: [
        {
          id: 'proj-da1',
          name: 'RetailPulse — E-Commerce Retention Dashboard',
          description: 'An interactive cohort analysis dashboard tracking customer retention, churn rates, and lifetime value trends.',
          goal: 'Help e-commerce decision makers identify early customer drop-off milestones across product categories.',
          contribution: 'Wrote complex SQL window functions for cohort retention and built interactive Power BI visualizations.',
          technologies: ['SQL', 'PostgreSQL', 'Power BI', 'Python', 'Pandas'],
          keyFeatures: [
            'Monthly customer cohort retention matrix',
            'Interactive average order value (AOV) forecasting',
            'Automated weekly CSV anomaly alerts'
          ],
          outcome: 'Uncovered key marketing channel driving 35% higher 90-day repeat purchase rate.',
          repositoryUrl: 'https://github.com/jordancruz-data/retail-cohort-analytics',
          liveUrl: 'https://jordancruz.dev/dashboards/retailpulse',
        },
        {
          id: 'proj-da2',
          name: 'EduMetrics — STEM Student Progression Analysis',
          description: 'An exploratory data analysis study investigating academic factors influencing introductory STEM course completion.',
          goal: 'Analyze historical grade distributions to identify prerequisite bottlenecks.',
          contribution: 'Cleaned multi-year academic datasets using Pandas and generated statistical distribution charts.',
          technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
          keyFeatures: [
            'Multivariate correlation heatmaps',
            'Prerequisite sequence completion probability model',
            'Documented reproducible Jupyter analysis notebook'
          ],
          outcome: 'Published as undergraduate honors research paper and presented at regional conference.',
          repositoryUrl: 'https://github.com/jordancruz-data/edumetrics-study',
          liveUrl: '',
        }
      ],
      preferences: {
        style: 'minimal',
        theme: 'light',
        accentColor: 'neutral',
        layout: 'single-page',
        motion: 'none',
        sections: ['about', 'skills', 'projects', 'education', 'experience', 'certifications', 'contact'],
        ctaLabel: 'Explore Data Insights',
      }
    }
  },

  // SAMPLE 5 — FREELANCER / CREATIVE DEVELOPER
  {
    id: 'freelancer-casey',
    name: 'Casey Rivera',
    role: 'Freelance Web Developer',
    category: 'Freelancer',
    focus: 'Modern Websites, Client Solutions & Creative Tech',
    summary: 'A client-focused developer portfolio highlighting bespoke commercial websites and responsive builds.',
    accent: 'purple',
    draft: {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      profile: {
        fullName: 'Casey Rivera',
        headline: 'Freelance Web Developer & Creative Technologist',
        about: 'Independent web developer crafting fast, responsive, and search-optimized websites for small businesses, creative studios, and independent brands. Focusing on clean code, smooth interactions, and rock-solid performance.',
        location: 'Denver, CO',
        email: 'hello@caseyrivera.dev',
        githubUrl: 'https://github.com/caseyrivera-dev',
        linkedinUrl: 'https://linkedin.com/in/caseyriveradev',
        websiteUrl: 'https://caseyrivera.dev',
        photoPreference: 'placeholder',
      },
      background: {
        status: 'freelancer',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'WordPress', 'Responsive Design', 'SEO', 'Figma', 'Git'],
        education: {
          school: 'Self-Taught & Ongoing Professional Practice',
          program: 'Frontend Architecture & Modern Web Standards',
          year: '2021 - Present',
        },
        experience: [
          {
            id: 'exp-f1',
            role: 'Independent Web Developer',
            organization: 'Casey Rivera Digital (Self-Employed)',
            duration: '2022 - Present',
            summary: 'Delivered 14+ custom client websites on time with 100/100 Lighthouse performance and SEO scores.',
          }
        ],
        certifications: [
          'Google Mobile Web & SEO Specialist',
          'Certified Webflow & WordPress Expert'
        ],
      },
      projects: [
        {
          id: 'proj-f1',
          name: 'Artisan Roast Co. — Brand Website & Menu',
          description: 'A responsive storefront and interactive digital menu for a craft coffee roastery with 3 retail locations.',
          goal: 'Modernize digital brand presence and drive foot traffic with mobile-first location finder and live daily roast menu.',
          contribution: 'Designed UI in Figma, coded responsive frontend, and configured automated deployment pipeline.',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Schema.org SEO'],
          keyFeatures: [
            'Mobile-optimized interactive coffee flavor wheel',
            'Integrated Google Maps store locator with live hours',
            '100/100 mobile Lighthouse performance rating'
          ],
          outcome: 'Increased client retail website orders by 45% within 60 days of launch.',
          repositoryUrl: 'https://github.com/caseyrivera-dev/artisan-roast',
          liveUrl: 'https://artisanroast-demo.example.com',
        },
        {
          id: 'proj-f2',
          name: 'Studio Lumina — Creative Agency Portfolio',
          description: 'A typography-forward portfolio website showcasing branding, videography, and photography projects.',
          goal: 'Deliver a fast, editorial digital experience highlighting visual media without heavy framework bloat.',
          contribution: 'Implemented lightweight scroll animations and accessible image lightbox galleries.',
          technologies: ['Vue 3', 'Tailwind CSS', 'Vanilla JavaScript'],
          keyFeatures: [
            'Smooth editorial section transitions',
            'Responsive multi-layout project grid',
            'Subtle dark mode aesthetic with high-contrast typography'
          ],
          outcome: 'Winner of Awwwards Honorable Mention in Student & Indie Web Category.',
          repositoryUrl: 'https://github.com/caseyrivera-dev/studio-lumina',
          liveUrl: 'https://studiolumina-demo.example.com',
        },
        {
          id: 'proj-f3',
          name: 'BookEase — Client Appointment Widget',
          description: 'A lightweight client consultation booking interface with automated timezone conversion.',
          goal: 'Enable freelance clients to schedule discovery sessions with zero friction.',
          contribution: 'Built reusable vanilla JavaScript calendar widget.',
          technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
          keyFeatures: [
            'Timezone-aware slot picker',
            'Form validation and confirmation email trigger',
            'Embeddable via single script tag'
          ],
          outcome: 'Integrated across 8 independent consultant websites.',
          repositoryUrl: 'https://github.com/caseyrivera-dev/bookease',
          liveUrl: 'https://bookease-demo.example.com',
        }
      ],
      preferences: {
        style: 'creative',
        theme: 'dark',
        accentColor: 'purple',
        layout: 'single-page',
        motion: 'moderate',
        sections: ['about', 'skills', 'projects', 'experience', 'certifications', 'contact'],
        ctaLabel: 'Hire Me for Your Project',
      }
    }
  }
]

export const SAMPLE_PORTFOLIO_DRAFT = SAMPLE_PROFILES[0].draft
