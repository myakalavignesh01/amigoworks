import { Project, ServiceItem, Founder, ProcessStep, Principle } from './types';

export const FOUNDERS: Founder[] = [
  {
    name: 'Vignesh',
    role: 'Founder • AI / Product / Strategy',
    titleBadge: 'FOUNDER',
    image: '/src/assets/images/vignesh_real_founder_1786789440900.jpg',
    specialization: ['AI Systems & LLMs', 'Product Architecture', 'Strategic Roadmapping'],
    description: 'Bridges complex user needs and machine intelligence to conceptualize products that deliver immediate utility.',
    philosophy: 'Start with high-leverage problems, then build intelligence natively into the user workflow.',
    skills: ['AI/LLM Workflows', 'Product Strategy', 'System Logic', 'Streamlit', 'Python']
  },
  {
    name: 'Sai Kiran',
    role: 'Co-Founder • Systems & Backend',
    titleBadge: 'CO-FOUNDER',
    image: '/src/assets/images/saikiran_real_cofounder_1786789666669.jpg',
    specialization: ['Distributed Systems', 'Backend Infrastructure', 'API & Automation Pipelines'],
    description: 'Designs reliable server architectures, high-throughput APIs, and automation routines engineered for scale and speed.',
    philosophy: 'Code should be clean, architectures should be resilient, and systems must run without friction.',
    skills: ['Backend Architecture', 'Python & Node.js', 'API Integration', 'Data Engineering', 'DevOps']
  },
  {
    name: 'Nuthan Sai',
    role: 'Co-Founder • Frontend & Design',
    titleBadge: 'CO-FOUNDER',
    image: '/src/assets/images/nuthansai_real_cofounder_1786789566684.jpg',
    specialization: ['Interface Design', 'Frontend Engineering', 'Interactive Motion & Systems'],
    description: 'Crafts crisp, responsive, high-performance interfaces with obsessive attention to typographic detail and interaction feel.',
    philosophy: 'A product is only as good as the feeling it gives to the human holding the device.',
    skills: ['React & Next.js', 'TypeScript & Tailwind', 'Motion Design', 'Design Systems', 'UX Architecture']
  }
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'AI SYSTEMS',
    tagline: 'Intelligent engines built for real-world execution.',
    capabilities: [
      'AI applications',
      'AI assistants',
      'Intelligent workflows',
      'AI integrations'
    ],
    techTags: ['Python', 'LLM Pipelines', 'RAG', 'Vector Search', 'Agents']
  },
  {
    number: '02',
    title: 'DIGITAL PRODUCTS',
    tagline: 'Full-cycle product development from zero to launch.',
    capabilities: [
      'MVPs',
      'SaaS applications',
      'Web platforms',
      'Product development'
    ],
    techTags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud Architecture']
  },
  {
    number: '03',
    title: 'WEB EXPERIENCES',
    tagline: 'High-craft digital storefronts and interactive interfaces.',
    capabilities: [
      'Business websites',
      'Landing pages',
      'Interactive experiences',
      'Responsive interfaces'
    ],
    techTags: ['Modern Web', 'Motion', 'Tailwind CSS', 'Performance Optimization', 'SEO']
  },
  {
    number: '04',
    title: 'AUTOMATION',
    tagline: 'Eliminating manual repetition with robust scripts and integrations.',
    capabilities: [
      'Python automation',
      'API integrations',
      'Business workflows',
      'Data processing'
    ],
    techTags: ['Python Automation', 'Custom Webhooks', 'ETL Jobs', 'Task Schedulers']
  },
  {
    number: '05',
    title: 'DATA & DASHBOARDS',
    tagline: 'Clear, real-time visual intelligence for informed decisions.',
    capabilities: [
      'Analytics',
      'Monitoring',
      'Visualization',
      'Business intelligence'
    ],
    techTags: ['Interactive Charts', 'Telemetry', 'Live Metrics', 'Data Pipelines']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-guardian-os',
    title: 'AI GUARDIAN OS',
    subtitle: 'Responsible AI Governance & Compliance Platform',
    category: 'AI / Governance / Product',
    technologies: ['Python', 'Streamlit', 'AI', 'Data'],
    badge: 'AI & Governance',
    deliverableType: 'Platform Architecture & Engine',
    description: 'A comprehensive governance system designed to evaluate, monitor, and regulate AI model outputs for safety, bias detection, and compliance standards.',
    challenge: 'AI deployments often lack centralized guardrails, making automated audit and compliance checks difficult across distributed development teams.',
    solution: 'Engineered an interactive governance workbench with automated prompt inspection, bias heuristic algorithms, and clear risk visualizers.',
    features: [
      'Automated Risk Scoring & Hallucination Guardrails',
      'Compliance Policy Rule Engine & Audit Logs',
      'Real-time Output Evaluation Dashboard',
      'Dataset Drift & Safety Threshold Monitoring'
    ],
    architecture: [
      'Python-powered heuristic validation pipeline',
      'Streamlit reactive UI with low-latency data updates',
      'Modular policy definitions for rapid governance checks'
    ]
  },
  {
    id: 'calci-py',
    title: 'CALCI.PY',
    subtitle: 'Academic Productivity & GPA Management Platform',
    category: 'EdTech / Productivity / Data',
    technologies: ['Python', 'Streamlit', 'Data Visualization'],
    badge: 'EdTech & Productivity',
    deliverableType: 'Productivity Application',
    description: 'An intuitive platform for students and academic institutions to calculate, project, and visualize GPA trajectories with granular grading curves and subject weighting.',
    challenge: 'Students struggle with complex, multi-semester credit distribution algorithms and scenario-planning for target cumulative scores.',
    solution: 'Created an intelligent computation platform offering instant visual forecasting, credit weighting calculators, and scenario simulations.',
    features: [
      'Multi-Semester Credit Weighted GPA Calculator',
      'Target Score Scenario Simulator',
      'Interactive Performance Trajectory Visualizations',
      'Exportable Academic Breakdown Reports'
    ],
    architecture: [
      'Deterministic Python calculation kernel',
      'Interactive data charts for multi-year tracking',
      'Zero-latency local state management'
    ]
  },
  {
    id: 'guide360',
    title: 'GUIDE360',
    subtitle: 'Interactive Travel & Destination Experience Platform',
    category: 'Travel / Web / Maps',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Maps', 'APIs'],
    badge: 'Web & Interactive',
    deliverableType: 'Interactive Web Experience',
    description: 'An exploratory travel portal featuring geo-tagged interactive exploration, curated location highlights, and real-time mapping integrations.',
    challenge: 'Standard travel directories feel static and overwhelming without intuitive visual exploration and spatially connected points of interest.',
    solution: 'Designed a fluid, responsive map-first web experience connecting curated location guides with contextual directions and itinerary planning.',
    features: [
      'Interactive Spatial Map Navigation',
      'Curated Destination Discovery Cards',
      'Responsive Mobile-First Itinerary Viewer',
      'Third-party Map API and Geolocation Hooks'
    ],
    architecture: [
      'Lightweight vanilla JavaScript UI engine for optimal load times',
      'Dynamic Map API integration with custom map overlays',
      'Responsive CSS grid and mobile touch-first interactions'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    summary: 'Understand the problem.',
    details: 'We deconstruct your core requirements, business objectives, and technical constraints to establish absolute clarity before writing a line of code.'
  },
  {
    number: '02',
    title: 'STRATEGIZE',
    summary: 'Define the right solution.',
    details: 'We architect the technical roadmap, choose the optimal toolchain, and design the system architecture tailored specifically for your goals.'
  },
  {
    number: '03',
    title: 'DESIGN',
    summary: 'Shape the experience.',
    details: 'We craft high-fidelity interfaces, typographic systems, and interaction models that turn complex workflows into intuitive digital products.'
  },
  {
    number: '04',
    title: 'BUILD',
    summary: 'Engineer the product.',
    details: 'Our team writes clean, maintainable, high-performance code across frontend, backend, and AI integration pipelines.'
  },
  {
    number: '05',
    title: 'TEST',
    summary: 'Refine the details.',
    details: 'We rigorously stress-test responsive states, edge cases, latency, and data integrity to ensure rock-solid stability.'
  },
  {
    number: '06',
    title: 'SHIP',
    summary: 'Launch into the real world.',
    details: 'We deploy to production infrastructure, configure continuous pipelines, and hand over a polished, ready-to-scale product.'
  }
];

export const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'IDEA FIRST',
    description: 'We start with the problem, not the technology. Every line of code exists to solve a real human or business challenge.'
  },
  {
    number: '02',
    title: 'DESIGN + ENGINEERING',
    description: 'We connect product thinking with implementation. Design and backend engineering work in continuous unison.'
  },
  {
    number: '03',
    title: 'FAST ITERATION',
    description: 'We build, test and improve quickly. Rapid feedback loops mean your product gets into production faster.'
  },
  {
    number: '04',
    title: 'REAL PRODUCTS',
    description: 'We focus on usable, deployable outcomes. No vaporware, no unnecessary bloat — just functional software that works.'
  },
  {
    number: '05',
    title: 'DIRECT COLLABORATION',
    description: 'Clients communicate directly with the people building their product. No account managers, no game of telephone.'
  }
];

export interface TechCategory {
  title: string;
  badge: string;
  description: string;
  leadFounder: string;
  tools: { name: string; level: string; description: string }[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'AI & INTELLIGENT SYSTEMS',
    badge: 'Vignesh / AI & Strategy',
    description: 'Engineered for real-world reliability, safe inference, and contextual intelligence.',
    leadFounder: 'Vignesh',
    tools: [
      { name: 'Python & PyTorch', level: 'Core', description: 'Model orchestrations and algorithmic kernels' },
      { name: 'LLM Pipelines & RAG', level: 'Production', description: 'Embeddings, vector indexing, retrieval pipelines' },
      { name: 'Streamlit & Fast AI UIs', level: 'Rapid', description: 'Fast prototyping and evaluation dashboards' },
      { name: 'Agentic Workflows', level: 'Specialist', description: 'Autonomous multi-step tooling & function calling' },
      { name: 'Guardrail Heuristics', level: 'Safety', description: 'Hallucination detection, risk mitigation filters' }
    ]
  },
  {
    title: 'BACKEND & CLOUD SYSTEMS',
    badge: 'Sai Kiran / Systems & Infra',
    description: 'High-throughput APIs, distributed task queues, and resilient database schemas.',
    leadFounder: 'Sai Kiran',
    tools: [
      { name: 'Node.js & Express / Fastify', level: 'Core', description: 'Low-latency REST and GraphQL gateways' },
      { name: 'Python (FastAPI & AsyncIO)', level: 'Production', description: 'High-concurrency data processors and ETL jobs' },
      { name: 'PostgreSQL & Redis', level: 'Database', description: 'ACID transactional integrity and in-memory caches' },
      { name: 'Docker & Container Infra', level: 'DevOps', description: 'Reproducible isolated microservices & deployments' },
      { name: 'Automation & Webhooks', level: 'Pipelines', description: 'Zero-manual-touch continuous sync routines' }
    ]
  },
  {
    title: 'FRONTEND & INTERFACE DESIGN',
    badge: 'Nuthan Sai / UX & Frontend',
    description: 'Pixel-perfect typography, 60fps micro-interactions, and responsive layout craftsmanship.',
    leadFounder: 'Nuthan Sai',
    tools: [
      { name: 'React 18 & Next.js', level: 'Core', description: 'Modern reactive component architectures' },
      { name: 'TypeScript', level: 'Strict', description: 'End-to-end type safety and resilient contracts' },
      { name: 'Tailwind CSS & Design Systems', level: 'Aesthetic', description: 'Bespoke design tokens and mathematical scales' },
      { name: 'Motion / Framer Engine', level: 'Physics', description: 'Subtle visual transitions and kinetic feedback' },
      { name: 'Responsive Web Standards', level: 'Mobile-First', description: 'Cross-device fluid rendering and WCAG AA contrast' }
    ]
  }
];

export interface FAQItem {
  id: string;
  question: string;
  category: 'Engagement' | 'Technical' | 'Delivery' | 'Collaboration';
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Collaboration',
    question: 'How does working directly with three founders differ from an agency?',
    answer: 'Traditional agencies introduce layers of account managers, non-technical project coordinators, and subcontracted junior developers. At AMIGOWORKS, you talk directly with the three people designing and writing every line of your codebase: Vignesh (AI & Strategy), Sai Kiran (Backend & Systems), and Nuthan Sai (Frontend & Design). Decisions happen in minutes, not weeks.'
  },
  {
    id: 'faq-2',
    category: 'Delivery',
    question: 'What is your typical turnaround timeline for an MVP or web product?',
    answer: 'A focused MVP or production web product typically ships in 2 to 4 weeks depending on architectural scope. Because all three disciplines (AI/Strategy, Systems, and Frontend) build concurrently in close daily sync, velocity is unmatched.'
  },
  {
    id: 'faq-3',
    category: 'Engagement',
    question: 'Who owns the intellectual property and code when the project is done?',
    answer: 'You own 100% of the source code, design assets, database schemas, and documentation upon project handover. We set up clean Git repositories, environment configurations, and deployment pipelines ready for your team.'
  },
  {
    id: 'faq-4',
    category: 'Technical',
    question: 'Can AMIGOWORKS integrate with our existing backend, database, or third-party APIs?',
    answer: 'Yes. We frequently integrate with existing REST/GraphQL APIs, third-party authentication providers, vector databases, CRM endpoints, payment systems (Stripe), and legacy databases without requiring you to rebuild from scratch.'
  },
  {
    id: 'faq-5',
    category: 'Delivery',
    question: 'What happens after launch? Do you provide maintenance and ongoing iterations?',
    answer: 'We provide post-launch stability monitoring, warranty bug-fixes, and smooth handover documentation. Many clients also retain us on dedicated sprint blocks for iterative feature expansion as their user base scales.'
  },
  {
    id: 'faq-6',
    category: 'Technical',
    question: 'How do you ensure security, data privacy, and AI safety in deployments?',
    answer: 'We adhere to enterprise security practices: strict environment secret management, parameterized database queries, token validation, rate-limiting, and proprietary AI guardrails (like those built in our AI Guardian OS platform) to prevent unauthorized prompts and data leaks.'
  },
  {
    id: 'faq-7',
    category: 'Collaboration',
    question: 'How do clients contact and communicate with AMIGOWORKS?',
    answer: 'We operate strictly and exclusively via email (myakalavignesh01@gmail.com). All project requirements, feature specifications, architecture reviews, budget scopes, timeline milestones, and delivery links are comprehensively communicated over structured email threads directly with the three founding engineers. No meeting fatigue or calendar chaos — everything is documented with precision in writing.'
  }
];

