/**
 * API Configuration
 * 
 * Toggle between mock data and real API endpoints
 * Set USE_MOCK to false when backend APIs are ready
 */

export const API_CONFIG = {
    // Mock data flags - set to false when backend is ready
    USE_MOCK_POSTS: true,
    USE_MOCK_COMMENTS: true,
    USE_MOCK_SUPPORT: true,
    USE_MOCK_MODERATION: true,

    // Real API endpoints are already configured for:
    // - Authentication (authService)
    // - Categories (categoryService)
    // - Subcategories (subcategoryService)
    // - Users (userService)
}

/**
 * When backend APIs are ready:
 * 
 * 1. Set the corresponding USE_MOCK flag to false
 * 2. The service will automatically switch to real API calls
 * 3. No other code changes needed!
 * 
 * Example:
 * API_CONFIG.USE_MOCK_POSTS = false  // Now uses real /api/v1/posts endpoint
 */
