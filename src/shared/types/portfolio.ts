export type PublicProfile = {
  name: string;
  nameEn: string;
  role: string;
  intro: string;
  email: string;
  location: string;
  github: string;
  githubLabel: string;
  linkedin: string;
  linkedinLabel: string;
  velog: string;
  velogLabel: string;
};

export type Experience = {
  id: string;
  showOnResume: boolean;
  period: string;
  role: string;
  org: string;
  desc: string;
  points: string[];
  tags: string[];
};

export type Project = {
  id: string;
  title: string;
  context: string;
  badge?: string;
  points: string[];
  tags: string[];
  href?: string;
  image: string;
  imageFit?: 'contain' | 'cover';
};

export type Certification = { id: string; name: string; org: string; date: string };
