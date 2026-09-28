export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  status: string;
  thumbnail_url: string | null;
  created_at: string;
}

export interface Profile {
  full_name: string;
  headline: string | null;
  bio: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  updated_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

export interface Experience {
  id: string;
  company_name: string;
  job_title: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean | null;
  thumbnail_url: string | null;
  description: string | null;
  created_at: string | null;
}

export interface ProjectAspects {
  id: string;
  project_id: string;
  aspect_title: string;
  description: string;
  tech_stack: string[];
  repo_url: string | null;
  sort_order: string;
}
