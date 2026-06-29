export const profile = {
  name: 'Kritiman Talukdar',
  role: 'Full Stack AI Engineer',
  tagline:
    'I build scalable AI systems, agentic workflows, and distributed backends that turn LLMs and RAG pipelines into real-world products.',
  email: 'kritiman_ug_24@ee.nits.ac.in',
  phone: '+91-8822617263',
  github: 'https://github.com/Kritiman2005',
  linkedin: 'https://linkedin.com/in/kritiman-talukdar',
  location: 'India · Remote',
}

export const experience = [
  {
    role: 'AI Engineer Intern',
    company: 'Bitshort',
    period: 'Apr 2026 – Jun 2026',
    location: 'Remote',
    summary:
      'Architected the core multi-agent AI system powering AarogyaDost, a production healthcare platform.',
    points: [
      'Architected and implemented the core multi-agent AI system, designing a Reasoning Agent and Validator Agent adversarial loop to improve factual accuracy and eliminate hallucinated clinical outputs.',
      'Engineered the end-to-end RAG architecture with intent-aware retrieval routing, document validation gates, and per-patient ChromaDB isolation, cutting retrieval costs ~60% while preventing cross-patient and cross-report data contamination.',
      'Developed and integrated eight specialized AI agents spanning clinical extraction, validation, biomarker analysis, recommendation generation, protocol generation, database reconciliation, and dashboard orchestration.',
      'Designed an OCR reconciliation pipeline that corrected extraction errors before downstream processing, improving medical document extraction accuracy from ~30% to over 85% across reports, prescriptions, and lab records.',
      'Resolved critical production reliability issues including SSE timeout failures, duplicate workflow triggers, stale retrieval contexts, and cross-report answer bleed.',
    ],
  },
]

// Atmospheric, abstract imagery (no people) — clouds, light, AI textures.
export const images = {
  heroClouds:
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1600&auto=format&fit=crop',
  aboutAtmosphere:
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1400&auto=format&fit=crop',
}

export const projects = [
  {
    name: 'Luxe Store',
    blurb: 'Full-Stack E-Commerce Platform',
    description:
      'A production-ready e-commerce platform supporting authentication, product management, shopping carts, orders, reviews, and admin operations for end-to-end online shopping. Secured with JWT, refresh tokens, HTTP-only cookies, and role-based access control, and powered by scalable REST APIs with MongoDB aggregation pipelines for search, filtering, pagination, and analytics.',
    tags: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multer'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop',
    repo: 'https://github.com/Kritiman2005/ecommerce-webapp',
    live: '',
  },
]

export const services = [
  {
    title: 'AI Systems & Agents',
    description:
      'Multi-agent architectures, RAG pipelines, and LLM-powered workflows that stay accurate and grounded in production.',
    items: ['Agentic workflows', 'RAG & retrieval routing', 'OCR & extraction', 'Prompt engineering'],
  },
  {
    title: 'Backend & APIs',
    description:
      'Scalable, secure REST services with clean auth, role-based access, and data layers that hold up under load.',
    items: ['REST APIs', 'Auth & RBAC', 'Databases & caching', 'Microservices'],
  },
  {
    title: 'Full-Stack Products',
    description:
      'End-to-end web apps — from data model to a polished React frontend — shipped and ready for real users.',
    items: ['React & Next.js', 'State management', 'Integrations', 'Deployment'],
  },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind'] },
  {
    group: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Redis', 'REST APIs', 'JWT', 'Microservices'],
  },
  {
    group: 'AI / ML',
    items: [
      'LLM Integration',
      'RAG Pipelines',
      'Agentic Workflows',
      'Prompt Engineering',
      'LangChain',
      'LangGraph',
      'OCR',
      'Computer Vision',
      'Vector Embeddings',
    ],
  },
  {
    group: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'ChromaDB', 'NeonDB'],
  },
  { group: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Nginx', 'Linux', 'CI/CD', 'Git'] },
  { group: 'Languages', items: ['Python', 'JavaScript'] },
]

export const education = {
  school: 'National Institute of Technology, Silchar',
  degree: 'B.Tech in Electrical Engineering',
  period: '2024 – 2028',
}
