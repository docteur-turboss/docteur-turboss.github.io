/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExperienceItem, ProjectItem, SkillGroup, PhilosophyItem } from './types';

export const PERSONAL_INFO = {
  name: 'Thomas Cherbonnel',
  title: 'Backend Architect & Engineering Leader',
  roleLevel: 'Senior Executive',
  avatarWide: 'https://media.licdn.com/dms/image/v2/D4E03AQEDSQeVyVOcnA/profile-displayphoto-scale_200_200/B4EZmVXfMkGUAY-/0/1759147587403?e=1785974400&v=beta&t=Q5oHIf_G4lgk1F18ha31fx_7zDDzi3JnwCpiBmUe0QM',
  avatarCompact: 'https://media.licdn.com/dms/image/v2/D4E03AQEDSQeVyVOcnA/profile-displayphoto-scale_200_200/B4EZmVXfMkGUAY-/0/1759147587403?e=1785974400&v=beta&t=Q5oHIf_G4lgk1F18ha31fx_7zDDzi3JnwCpiBmUe0QM',
  bio: 'Senior Backend Engineer with 7+ years of experience crafting high-scale architectures. Specialized in code quality, system reliability, and modular backend ecosystems. I build simple, scalable solutions for complex technical challenges.',
  location: 'Lille, France',
  website: 'https://github.com/docteur-turboss',
  email: 'thom.cherbonnel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thomas-gille-cherbonnel'
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Java']
  },
  {
    category: 'Frameworks & Technologies',
    skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Docker', 'Git', 'Redis', 'CI/CD', 'Microservices']
  }
];

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    title: 'Architecture-First Design',
    description: 'Focusing on robust structural foundations before implementation.',
    icon: 'architecture'
  },
  {
    title: 'Clean Code Standards',
    description: 'Ensuring code is readable, maintainable, and efficient.',
    icon: 'verified_user'
  },
  {
    title: 'CI/CD Automation',
    description: 'Streamlining deployment cycles with reliable automated pipelines.',
    icon: 'sync'
  },
  {
    title: 'System Reliability',
    description: 'Building resilient services that perform under high-load scenarios.',
    icon: 'dns'
  },
  {
    title: 'Scalable Solutions',
    description: 'Crafting modular systems that evolve alongside business needs.',
    icon: 'settings_suggest'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-2',
    title: 'Développeur Full Stack',
    company: 'AFPA',
    period: '10/2023 – 07/2024',
    bullets: [
      'Conception and development of a web application.',
      'Full-lifecycle documentation and backend optimization.'
    ]
  },
  {
    id: 'exp-2',
    title: 'Service civique',
    company: 'France Travail Haubourdin',
    period: '09/2024 – 04/2025',
    bullets: [
      'Supporting customers with their digital tasks and assisting them in using online services.'
    ]
  },
  {
    id: 'exp-side1',
    title: 'GlaDOS - Discord Bot',
    company: '',
    period: '10/2024 – 12/2024',
    bullets: [
      'Refactoring the repository to improve code quality, maintainability, and scalability.',
      'Implementing a modular architecture to facilitate future feature additions and enhancements.',
      'Optimizing performance and resource usage to ensure smooth operation under high load conditions.'
    ]
  },
  {
    id: 'exp-3',
    title: 'Helpdesk & Digital Support',
    company: 'M2i',
    period: '05/2025 – 07/2025',
    bullets: [
      'Providing technical assistance and support for incoming queries and issues related to computer systems, software, and hardware.'
    ]
  },
  {
    id: 'exp-side2',
    title: 'Croissant-API',
    company: '',
    period: '10/2025 – 12/2025',
    bullets: [
      'Migrate the existing codebase from Versify to Express.js, ensuring compatibility and maintaining functionality.',
      'Refactor the code to improve readability, maintainability, and performance, following best practices and design patterns.',
      'Implement a modular architecture to facilitate future feature additions and enhancements.',
      'Optimize database queries and data handling to enhance performance and reduce latency.',
      'Ensure proper error handling and logging mechanisms are in place for better debugging and monitoring.'
    ]
  },
  {
    id: 'exp-4',
    title: 'DAEU - A',
    company: 'Univeristé de Lille',
    period: '09/2025 - 07/2026',
    bullets: [
      'Successfully completed the DAEU-A program, equivalent to a high school diploma, with a focus on general education and foundational knowledge.'
    ]
  }
];

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Creation of a web app for managing personal finances',
    category: 'App web',
    description: "Web application for managing personal finances, allowing users to track their expenses, create budgets, and analyze their financial habits. The application offers a \"kiff score\" measurement to evaluate how much you can spend daily based on your income, liabilities, and expenses.",
    image: 'https://pbs.twimg.com/profile_banners/1874433696444379136/1753521509/1500x500',
    icon: 'description',
    tags: ['TypeScript', "MySQL", "Express", "React", "Node.js"],
    interactiveDemo: {
      details: "Unfortunately, this project is cancelled due to a lack of time and resources. However, the initial architecture was designed to be modular and scalable, allowing for future development and integration of features such as budget tracking, expense categorization, and financial analytics.\nThe application was built with Express.js for the backend, MySQL for the database, and React for the frontend. The architecture was designed to support user authentication, secure data storage, and responsive design for mobile and desktop users.",
      link: 'https://github.com/Horus-Turboss-Finance'
    }
  },
  {
    id: 'project-2',
    title: "Creation of a algorithmic trading backend architecture",
    category: 'Backend',
    description: 'Microservices ecosystem using Docker and automated CI/CD pipelines.',
    image: 'https://img.magnific.com/free-vector/buy-sell-trend-forex-trading-background_1017-31712.jpg?semt=ais_hybrid&w=740&q=80',
    icon: 'hub',
    tags: ['Docker', 'Microservices', 'Node.js', 'CI/CD', 'Trading', 'MLP', "Redis", "MongoDB", "MySQL"],
    interactiveDemo: {
      details: "This project is a backend architecture for an Deep Q Learning-based algorithmic trading system with genetic algorithm optimization. It is designed to be modular, scalable, and efficient, allowing for the deployment of multiple trading strategies and the integration of various data sources. The architecture leverages Docker for containerization, enabling easy deployment and management of microservices. CI/CD pipelines are implemented to automate testing, building, and deployment processes, ensuring rapid iteration and continuous improvement of the system.",
      metrics: [
        { label: "Version", value: "v3.0.0" },
        { label: "Avg test coverage", value: "+82.1%" },
        { label: "Total test", value: "+5k" }
      ],
      link: "https://github.com/docteur-turboss/trading-model"
    }
  },
  {
    id: 'project-3',
    title: 'Projet GlaDOS',
    category: 'Bot Discord',
    description: 'Discord bot for community management and moderation, capable of handling large-scale interactions without using any external database. It is designed to be highly efficient, scalable, and capable of processing a high volume of real-time events and messages.',
    icon: 'robot_2',
    tags: ['Discord.js', 'Node.js', 'Webhooks', 'Events'],
    interactiveDemo: {
      details: "GlaDOS is an intelligent virtual assistant and community moderator. It scales automatically, manages raid verification, enforces complex access rules, and processes large flows of real-time server messages via custom webhooks and event listeners. It use home made LLM to provide advanced moderation and user interaction capabilities.",
      metrics: [
        { label: "Active Users", value: "+2 Millions" },
        { label: "Events / Day", value: "+10.2 Millions" },
        { label: "Response Delay", value: "45ms" }
      ],
    }
  }
];
