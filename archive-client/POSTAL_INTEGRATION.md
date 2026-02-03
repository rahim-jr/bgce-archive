# Postal Integration - Archive Client

## Overview
The archive-client now displays real posts from the Postal microservice, dynamically filtered by category and subcategory.

## Configuration

### Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1          # Cortex (Categories)
NEXT_PUBLIC_POSTAL_API_URL=http://localhost:8081/api/v1   # Postal (Posts)
```

## API Integration

### New API Functions (`lib/api.ts`)

#### Post Functions
- `getPosts(params?)` - Fetch posts with optional filters
  - `status` - Filter by status (defaults to 'published')
  - `category_id` - Filter by category
  - `sub_category_id` - Filter by subcategory
  - `limit` - Number of posts to fetch
  - `offset` - Pagination offset

- `getPostBySlug(slug)` - Fetch single post by URL slug
- `getPostById(id)` - Fetch single post by ID

## Routes

### Dynamic Routes Created

1. **All Posts** - `/archive`
   - Displays all published posts
   - No filtering

2. **Category Posts** - `/archive/category/[slug]`
   - Displays posts from specific category
   - Shows category name and description
   - Example: `/archive/category/programming`

3. **Subcategory Posts** - `/archive/category/[categorySlug]/[subcategorySlug]`
   - Displays posts from specific subcategory
   - Shows subcategory name and description
   - Example: `/archive/category/programming/javascript`

4. **Individual Post** - `/archive/post/[slug]`
   - Displays full post content
   - Shows metadata (published date, views)
   - Renders HTML/Markdown content
   - Example: `/archive/post/my-first-post`

## Components Updated

### ArticlePage Component
Now accepts `post` prop and displays:
- Post title
- Published date
- View count
- Summary (if available)
- Full content (HTML rendered)
- Voting UI (placeholder for future)

### ArchiveWrapper Component
Receives transformed articles from API posts:
- Maps `ApiPost` to `Article` format
- Displays in list/grid view
- Handles empty states

## Data Flow

```
Postal API → lib/api.ts → Page Component → UI Component
```

### Example Flow:
1. User visits `/archive/category/programming`
2. Page fetches category by slug from Cortex
3. Page fetches posts filtered by category_id from Postal
4. Posts transformed to Article format
5. ArchiveWrapper displays the articles

## Post Transformation

API Post → Article:
```typescript
{
  id: post.id,
  title: post.title,
  author: "Archive Team",
  publishedAt: formatted_date,
  views: post.view_count,
  votes: 0,
  description: post.summary || post.meta_description,
  tags: post.keywords.split(",")
}
```

## Features

### Filtering
- ✅ All posts
- ✅ By category
- ✅ By subcategory
- ✅ Only published posts shown
- ✅ Only public posts shown

### Post Display
- ✅ Title and metadata
- ✅ Summary/description
- ✅ View count
- ✅ Published date
- ✅ Tags from keywords
- ✅ Full content rendering

### SEO
- ✅ Dynamic meta titles
- ✅ Meta descriptions
- ✅ OG images (from post data)
- ✅ Keywords

## Usage Examples

### Create a Post in Admin
1. Login to archive-admin
2. Go to Posts → Create Post
3. Fill in:
   - Title: "Getting Started with Go"
   - Slug: "getting-started-with-go"
   - Content: Your article content
   - Category: Select category
   - Summary: Brief description
4. Publish the post

### View on Archive Client
- All posts: `http://localhost:3000/archive`
- By category: `http://localhost:3000/archive/category/programming`
- Specific post: `http://localhost:3000/archive/post/getting-started-with-go`

## Navigation Flow

```
Home Page
  ↓
Archive Page (All Posts)
  ↓
Category Page (Filtered by Category)
  ↓
Subcategory Page (Filtered by Subcategory)
  ↓
Post Page (Individual Post)
```

## Future Enhancements

- [ ] Pagination for large post lists
- [ ] Search functionality
- [ ] Tag-based filtering
- [ ] Featured posts section
- [ ] Related posts
- [ ] Post voting system
- [ ] Comments section
- [ ] Author profiles
- [ ] Reading time calculation
- [ ] Table of contents for long posts
- [ ] Social sharing buttons
- [ ] Print-friendly view

## Testing

### Manual Testing Checklist
- [ ] View all posts at `/archive`
- [ ] Filter by category
- [ ] Filter by subcategory
- [ ] View individual post
- [ ] Check post metadata displays correctly
- [ ] Verify only published posts show
- [ ] Test with no posts (empty state)
- [ ] Test with many posts (pagination)

### Test Data
Create test posts in different categories:
1. Programming → JavaScript
2. Programming → Python
3. Design → UI/UX
4. Design → Graphics

Then verify filtering works correctly.

## Troubleshooting

### Posts not showing
1. Check Postal service is running: `curl http://localhost:8081/api/v1/health`
2. Verify posts are published in admin
3. Check posts have `is_public = true`
4. Check browser console for errors

### Category filtering not working
1. Verify category exists and is approved
2. Check posts have correct `category_id`
3. Verify API URL in `.env.local`

### Post content not rendering
1. Check post has content in database
2. Verify HTML is valid
3. Check for JavaScript errors in console

## Related Documentation
- [Postal Service README](../../postal/README.md)
- [Archive Admin Integration](../../archive-admin/POSTAL_INTEGRATION.md)
- [API Documentation](./lib/api.ts)
