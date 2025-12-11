# Migration from Directus to Prisma

This document outlines the migration from Directus to Prisma that has been completed.

## What Was Changed

### 1. Database Layer
- **Removed**: Directus SDK (`@directus/sdk`, `@directus/types`)
- **Added**: Prisma (`prisma`, `@prisma/client`)
- **Created**: Prisma schema at `prisma/schema.prisma` with two models:
  - `Page` - for blog/content pages
  - `Inspiration` - for OG image inspiration entries

### 2. File Storage
- **Removed**: Directus file upload API
- **Added**: Local file storage utility (`lib/file-storage.ts`)
- Files are now stored in `public/uploads/` directory
- Created `getFileUrl()` function that handles both:
  - Legacy Directus file IDs (UUIDs) - still served from Directus for backward compatibility
  - New file paths - served from local storage

### 3. Code Updates
- `lib/directus.ts` - Now uses Prisma instead of Directus SDK (kept same function signatures for compatibility)
- `jobs/domain.ts` - Updated to use Prisma for create/update operations
- All image URL references updated to use `getFileUrl()` utility
- Removed Directus dependencies from `package.json` and `tsconfig.json`

## Next Steps

### 1. Set Up Database
You need to set up a PostgreSQL database and configure the connection:

```bash
# Add to your .env.local file:
DATABASE_URL="postgresql://user:password@localhost:5432/ogimage?schema=public"
```

### 2. Run Migrations
Once your database is set up, create and run the initial migration:

```bash
# Create migration
npx prisma migrate dev --name init

# Or if you want to apply without creating a migration file:
npx prisma db push
```

### 3. Migrate Existing Data (Optional)
If you have existing data in Directus, you'll need to:
1. Export data from Directus
2. Transform it to match Prisma schema
3. Import using Prisma or SQL scripts

### 4. Migrate Files (Optional)
For existing Directus file IDs:
- The code currently falls back to Directus URLs for UUID file IDs
- You can migrate files later by:
  1. Downloading files from Directus
  2. Uploading to `public/uploads/`
  3. Updating database records with new file paths

### 5. Environment Variables
Make sure you have:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` - Your app URL (defaults to `https://ogimage.org`)

### 6. Remove Directus Environment Variables
You can now remove:
- `DIRECTUS_TOKEN` (no longer needed)

## File Storage Considerations

The current implementation stores files locally in `public/uploads/`. For production, consider:

1. **Cloud Storage**: Update `lib/file-storage.ts` to use S3, Cloudflare R2, or similar
2. **CDN**: Serve uploaded files through a CDN for better performance
3. **File Migration**: Migrate existing Directus files to your new storage solution

## Testing

After setup, test:
1. Reading pages and inspirations
2. Creating new inspirations via the job
3. Image URLs resolve correctly (both old and new)

## Rollback

If you need to rollback:
1. Restore Directus dependencies: `bun add @directus/sdk @directus/types`
2. Revert changes to `lib/directus.ts` and `jobs/domain.ts`
3. Restore Directus configuration
