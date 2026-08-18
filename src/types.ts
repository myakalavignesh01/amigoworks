export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  architecture: string[];
  deliverableType: string;
  badge: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  capabilities: string[];
  techTags: string[];
}

export interface Founder {
  name: string;
  role: string;
  titleBadge?: string;
  image?: string;
  specialization: string[];
  description: string;
  philosophy: string;
  skills: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  details: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  timeline: string;
}
