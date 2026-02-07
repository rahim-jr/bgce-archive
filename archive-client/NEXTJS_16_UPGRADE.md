# Next.js 16 Upgrade Guide

## Changes Made

### Package Updates
- **Next.js**: 15.4.6 → 16.1.6
- **eslint-config-next**: 15.4.6 → 16.1.6

## Installation Steps

Run the following command to install the updated dependencies:

```bash
cd archive-client
pnpm install
```

Or if using npm:
```bash
cd archive-client
npm install
```

## Key Features in Next.js 16

### 1. Performance Improvements
- Enhanced build performance with optimized bundling
- Faster hot module replacement (HMR)
- Improved server-side rendering performance

### 2. React 19 Support
- Full compatibility with React 19.1.0 (already in use)
- Better streaming and suspense support

### 3. Turbopack Improvements
- More stable Turbopack (already using `--turbopack` in dev script)
- Better error messages and debugging

### 4. Enhanced Caching
- Improved fetch caching with better revalidation
- More predictable ISR (Incremental Static Regeneration)

## Breaking Changes to Watch For

### 1. Async Request APIs (Already Handled)
Your code already uses the new async `params` pattern:
```typescript
const { slug } = await params; // ✅ Correct
```

### 2. Dynamic Rendering
You've already added proper route segment configs:
```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 60;
```

### 3. Fetch Caching
Updated to use `next: { revalidate }` instead of `cache: 'no-store'` ✅

## Testing Checklist

After upgrading, test the following:

- [ ] Development server starts: `pnpm dev`
- [ ] Production build succeeds: `pnpm build`
- [ ] All routes render correctly:
  - [ ] Home page (`/`)
  - [ ] Archive page (`/archive`)
  - [ ] Category pages (`/archive/[categorySlug]`)
  - [ ] Subcategory pages (`/archive/[categorySlug]/[subcategorySlug]`)
  - [ ] Post pages (`/archive/post/[slug]`)
- [ ] API calls work correctly
- [ ] Images load properly
- [ ] Theme switching works
- [ ] Krakens Analytics initializes

## Rollback Plan

If issues occur, rollback by reverting package.json:
```bash
git checkout HEAD -- package.json
pnpm install
```

## Additional Resources

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-16)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/05/react-19)
