export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Article {
  id: number; // Needed for key in lists
  title: string;
  author: string; // New field
  publishedAt: string; // New field
  views: number; // New field
  votes: number; // New field
  description: string;
  tags: string[]; // New field
}

// API Response Types
export interface ApiCategory {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  label: string;
  slug: string;
  description: string;
  status: 'approved' | 'pending' | 'rejected' | 'deleted';
  parent_id?: number | null; // Optional because of omitempty in backend
  creator_id: number;
  meta: Record<string, any> | null;
}

export interface ApiSubcategory {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  label: string;
  slug: string;
  description: string;
  status: 'approved' | 'pending' | 'rejected' | 'deleted';
  parent_id: number;
  creator_id: number;
  meta: Record<string, any> | null;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
