export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  status: string;
  thumbnail_url: string | null;
  created_at: string;
}
