# Database Design Report - Rose Pearl Entertainment

**Date:** 2026-03-04
**Analyst:** Claude Code (database-designer + database-schema-designer)

## Schema Overview

The database has **2 main schemas** with **25+ tables**:

### Schema 1: Public Catalog (Public-Facing)
| Table | Purpose | Records |
|-------|---------|---------|
| `artists` | Artist profiles | ~50-500 |
| `releases` | Albums/EPs/Singles | ~200-1000 |
| `tracks` | Individual songs | ~2000-5000 |
| `products` | Merchandise | ~100-500 |

### Schema 2: Suite Management (Internal)
| Table | Purpose | Records |
|-------|---------|---------|
| `user_roles` | Role-based access | ~20-100 |
| `permissions` | Permission definitions | ~50-200 |
| `projects` | Project management | ~100-500/year |
| `project_phases` | Project timelines | ~500-2000 |
| `tasks` | Task management | ~1000-5000 |
| `task_dependencies` | Task relationships | ~500-2000 |
| `calendar_events` | Calendar/bookings | ~500-2000/year |
| `artist_team_members` | Team assignments | ~100-500 |
| `project_collaborators` | Project access | ~200-1000 |
| `media_assets` | File management | ~5000-20000 |
| `media_versions` | Version control | ~10000-50000 |
| `media_permissions` | Access control | ~10000-30000 |
| `media_credits` | Credit tracking | ~5000-15000 |
| `ai_agents` | AI agent definitions | ~10-50 |
| `ai_plans` | Generated plans | ~100-500/year |
| `ai_approvals` | Approval workflow | ~200-1000/year |
| `ai_executions` | Execution logs | ~500-2000/year |
| `ai_agent_permissions` | AI permissions | ~50-200 |
| `audit_logs` | Security audit | ~10000-100000/year |

## Entity Relationship Diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    artists      │────▶│    releases      │◄────│     tracks      │
├─────────────────┤     ├──────────────────┤     ├─────────────────┤
│ PK: id (uuid)   │     │ PK: id (uuid)    │     │ PK: id (uuid)   │
│ name            │     │ FK: artist_id    │     │ FK: release_id  │
│ slug (unique)   │     │ title            │     │ FK: artist_id   │
│ bio             │     │ slug (unique)    │     │ audio_url       │
│ social handles  │     │ type (enum)      │     │ duration        │
└─────────────────┘     │ cover_url        │     │ plays           │
         │              │ release_date     │     └─────────────────┘
         │              └──────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│   user_roles    │     │    projects      │
├─────────────────┤     ├──────────────────┤
│ PK: id          │     │ PK: id           │
│ FK: user_id     │     │ FK: artist_id    │
│ role (enum)     │     │ FK: release_id   │
└─────────────────┘     │ type (enum)      │
         │              │ status (enum)    │
         │              └──────────────────┘
         ▼                       │
┌─────────────────┐              ▼
│  permissions    │     ┌──────────────────┐     ┌─────────────────┐
├─────────────────┤     │  project_phases  │────▶│     tasks       │
│ PK: id          │     ├──────────────────┤     ├─────────────────┤
│ role            │     │ PK: id           │     │ PK: id          │
│ resource        │     │ FK: project_id   │     │ FK: project_id  │
│ action          │     │ name             │     │ assigned_to     │
└─────────────────┘     │ date range       │     │ status (enum)   │
                        └──────────────────┘     │ priority        │
                                                 └─────────────────┘
┌─────────────────┐              │
│calendar_events  │◄─────────────┘
├─────────────────┤
│ PK: id          │
│ FK: artist_id   │
│ FK: project_id  │
│ event_type      │
│ time range      │
└─────────────────┘

┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  media_assets   │────▶│  media_versions  │     │media_permissions│
├─────────────────┤     ├──────────────────┤     ├─────────────────┤
│ PK: id          │     │ PK: id           │     │ PK: id          │
│ FK: artist_id   │     │ FK: asset_id     │     │ FK: asset_id    │
│ FK: project_id  │     │ version_number   │     │ FK: user_id     │
│ file_type       │     │ file_url         │     │ permissions   │
│ asset_type      │     └──────────────────┘     └─────────────────┘
└─────────────────┘

┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   ai_agents     │────▶│    ai_plans      │────▶│  ai_approvals   │
├─────────────────┤     ├──────────────────┤     ├─────────────────┤
│ PK: id          │     │ PK: id           │     │ PK: id          │
│ name (unique)   │     │ FK: agent_id     │     │ FK: plan_id     │
│ agent_type      │     │ FK: project_id   │     │ FK: approved_by │
│ status          │     │ status (enum)    │     │ status          │
│ scope           │     │ plan_data (jsonb)│     └─────────────────┘
└─────────────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│ ai_executions   │
├─────────────────┤
│ PK: id          │
│ FK: plan_id     │
│ FK: agent_id    │
│ actions_taken   │
│ results (jsonb) │
└─────────────────┘
```

## Strengths

1. **Comprehensive RLS Implementation** - Row Level Security enabled on all tables
2. **Audit Trail** - Full audit_logs table with user tracking
3. **Version Control** - media_versions for asset versioning
4. **Permission System** - Fine-grained access control
5. **Proper Indexing** - Performance indexes on foreign keys and frequently queried fields
6. **Enums for Type Safety** - Check constraints for status, types, roles
7. **Trigger Automation** - updated_at handled automatically

## Recommendations

### 1. Additional Indexes for Performance

```sql
-- Composite indexes for common queries
CREATE INDEX idx_releases_artist_date ON public.releases(artist_id, release_date DESC);
CREATE INDEX idx_tracks_plays ON public.tracks(plays DESC) WHERE plays > 0;
CREATE INDEX idx_projects_status_date ON public.projects(status, target_release_date);
CREATE INDEX idx_tasks_priority_due ON public.tasks(priority, due_date) WHERE status != 'completed';

-- Full-text search indexes
CREATE INDEX idx_artists_name_trgm ON public.artists USING gin(name gin_trgm_ops);
CREATE INDEX idx_releases_title_trgm ON public.releases USING gin(title gin_trgm_ops);

-- JSONB indexes for AI plans
CREATE INDEX idx_ai_plans_data ON public.ai_plans USING gin(plan_data);
CREATE INDEX idx_ai_executions_actions ON public.ai_executions USING gin(actions_taken);
```

### 2. Partitioning for Large Tables

```sql
-- Partition audit_logs by month for performance
CREATE TABLE public.audit_logs_partitioned (
    LIKE public.audit_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE public.audit_logs_2026_03 PARTITION OF public.audit_logs_partitioned
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
```

### 3. Materialized Views for Analytics

```sql
-- Artist stats materialized view
CREATE MATERIALIZED VIEW public.artist_stats AS
SELECT
    a.id,
    a.name,
    COUNT(DISTINCT r.id) as release_count,
    COUNT(DISTINCT t.id) as track_count,
    COALESCE(SUM(t.plays), 0) as total_plays
FROM public.artists a
LEFT JOIN public.releases r ON r.artist_id = a.id
LEFT JOIN public.tracks t ON t.artist_id = a.id
GROUP BY a.id, a.name;

CREATE UNIQUE INDEX idx_artist_stats_id ON public.artist_stats(id);

-- Refresh schedule: REFRESH MATERIALIZED VIEW CONCURRENTLY public.artist_stats;
```

### 4. Connection Pooling (PgBouncer)

For production, use connection pooling:
```
# Supabase automatically uses PgBouncer on port 6543
DATABASE_URL=postgresql://...:6543/postgres?pgbouncer=true
```

### 5. API Security Enhancements

```sql
-- Add rate limiting table
CREATE TABLE public.api_rate_limits (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    endpoint text NOT NULL,
    requests_count integer DEFAULT 1,
    window_start timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, endpoint, window_start)
);

-- Create index for rate limit queries
CREATE INDEX idx_rate_limits_user_endpoint ON public.api_rate_limits(user_id, endpoint, window_start);
```

### 6. Backup Strategy

- **Daily automated backups** (Supabase provides this)
- **Point-in-time recovery** enabled
- **Test restore** monthly

## Query Optimization Examples

### Fetch artist with releases (optimized)
```sql
SELECT
    a.*,
    jsonb_agg(
        jsonb_build_object(
            'id', r.id,
            'title', r.title,
            'cover_url', r.cover_url,
            'release_date', r.release_date
        ) ORDER BY r.release_date DESC
    ) FILTER (WHERE r.id IS NOT NULL) as releases
FROM public.artists a
LEFT JOIN public.releases r ON r.artist_id = a.id
WHERE a.slug = 'artist-slug'
GROUP BY a.id;
```

### Search with trigram similarity
```sql
SELECT * FROM public.artists
WHERE name % 'search term'
ORDER BY similarity(name, 'search term') DESC
LIMIT 20;
```

## Next Steps

1. Add the recommended composite indexes
2. Set up materialized views for dashboard analytics
3. Implement API rate limiting
4. Configure automated backups
5. Test query performance with EXPLAIN ANALYZE
6. Consider read replicas for analytics queries
