import type { ApiCategory, ApiSubcategory, ApiResponse } from '@/types/blog.type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function getCategories(): Promise<ApiCategory[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories?status=approved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Disable caching for fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        const result: ApiResponse<ApiCategory[]> = await response.json();

        if (!result.status) {
            throw new Error(result.message || 'Failed to fetch categories');
        }

        // Filter only top-level categories (no parent_id or parent_id is null/undefined/0)
        return result.data.filter(cat => !cat.parent_id || cat.parent_id === null);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getSubcategories(parentUuid?: string): Promise<ApiSubcategory[]> {
    try {
        const url = parentUuid
            ? `${API_BASE_URL}/sub-categories?parent_uuid=${parentUuid}&status=approved`
            : `${API_BASE_URL}/sub-categories?status=approved`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
        }

        const result: ApiResponse<ApiSubcategory[] | null> = await response.json();

        if (!result.status) {
            throw new Error(result.message || 'Failed to fetch subcategories');
        }

        // Handle null data from backend
        return result.data || [];
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return [];
    }
}

export async function getCategoryBySlug(slug: string): Promise<ApiCategory | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories?slug=${slug}&status=approved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch category: ${response.statusText}`);
        }

        const result: ApiResponse<ApiCategory[]> = await response.json();

        if (!result.status || result.data.length === 0) {
            return null;
        }

        return result.data[0];
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}
