export type PostRow = {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};