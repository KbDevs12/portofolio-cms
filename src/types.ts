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
  headline?: string;
  bio?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  updated_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

export interface Experience {}

export interface ProjectAspects {
  id: string;
  project_id: string;
  aspect_title: string;
  description: string;
  tech_stack: string[];
  repo_url: string | null;
  sort_order: string;
}
