# Supabase Migration Notes

## Required Environment Variables

Use these in your Nuxt environment:

```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

## SQL Schema and RLS

Run [supabase/schema.sql](../supabase/schema.sql) in the Supabase SQL editor.

## JSON to Supabase Migration

The one-off migration script reads `server/data/posts.json` and upserts rows into `public.posts`:

```bash
npm run migrate:supabase
```

Optional environment variable:

```env
SUPABASE_MIGRATION_AUTHOR_ID=auth_user_uuid
```

If omitted, the script uses the first user returned by `auth.admin.listUsers`.
