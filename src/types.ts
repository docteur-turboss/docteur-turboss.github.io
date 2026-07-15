/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  isScheduled?: boolean;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  icon?: string;
  tags?: string[];
  link?: string;
  interactiveDemo?: {
    link?: string;
    details: string;
    metrics?: { label: string; value: string }[];
  };
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
