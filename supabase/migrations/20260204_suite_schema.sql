-- RosePearl Record Label Suite - Database Extensions
-- Migration: 002_suite_schema
-- Extends existing schema with suite-specific tables

-- ============================================
-- 1. USER ROLES & PERMISSIONS
-- ============================================

-- User roles table (extends auth.users)
create table public.user_roles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text not null check (role in ('super_admin', 'label_admin', 'a_r', 'manager', 'artist', 'creative', 'marketing', 'finance', 'viewer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Permissions definitions
create table public.permissions (
  id uuid default uuid_generate_v4() primary key,
  role text not null,
  resource text not null, -- 'artists', 'projects', 'media', 'ai_agents', etc.
  action text not null, -- 'create', 'read', 'update', 'delete', 'approve'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(role, resource, action)
);

-- ============================================
-- 2. PROJECTS & PLANNING
-- ============================================

-- Projects (extends releases with more detail)
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null unique,
  artist_id uuid references public.artists(id) not null,
  release_id uuid references public.releases(id), -- Links to existing release if applicable
  type text not null check (type in ('single', 'ep', 'album', 'campaign', 'tour', 'brand_deal')),
  status text not null default 'planning' check (status in ('planning', 'pre_production', 'production', 'marketing', 'released', 'archived')),
  description text,
  target_release_date date,
  budget_cents integer,
  created_by uuid references auth.users(id)
);

-- Project phases (timeline breakdown)
create table public.project_phases (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  name text not null,
  start_date date not null,
  end_date date not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'delayed')),
  color text, -- hex color for timeline visualization
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tasks
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  project_id uuid references public.projects(id) on delete cascade,
  assigned_to uuid references auth.users(id),
  created_by uuid references auth.users(id),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'review', 'completed', 'cancelled')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  due_date timestamp with time zone,
  completed_at timestamp with time zone
);

-- Task dependencies
create table public.task_dependencies (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references public.tasks(id) on delete cascade not null,
  depends_on_task_id uuid references public.tasks(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(task_id, depends_on_task_id)
);

-- Calendar events
create table public.calendar_events (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  event_type text not null check (event_type in ('booking', 'studio_session', 'shoot', 'release', 'deadline', 'meeting', 'brand_campaign')),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  location text,
  artist_id uuid references public.artists(id),
  project_id uuid references public.projects(id),
  created_by uuid references auth.users(id)
);

-- ============================================
-- 3. TEAM MANAGEMENT
-- ============================================

-- Artist team members (who works with which artist)
create table public.artist_team_members (
  id uuid default uuid_generate_v4() primary key,
  artist_id uuid references public.artists(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('manager', 'a_r', 'producer', 'publicist', 'creative_director', 'social_media')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(artist_id, user_id, role)
);

-- Project collaborators (who has access to which project)
create table public.project_collaborators (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null,
  can_edit boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, user_id)
);

-- ============================================
-- 4. MEDIA VAULT
-- ============================================

-- Media assets (extends existing tracks with more metadata)
create table public.media_assets (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  file_type text not null check (file_type in ('audio', 'video', 'image', 'document')),
  file_url text not null, -- Supabase Storage URL
  file_size_bytes bigint,
  mime_type text,
  artist_id uuid references public.artists(id),
  project_id uuid references public.projects(id),
  track_id uuid references public.tracks(id), -- Links to existing track if applicable
  asset_type text check (asset_type in ('demo', 'master', 'stem', 'video', 'artwork', 'contract', 'other')),
  version_number integer default 1,
  is_latest_version boolean default true,
  uploaded_by uuid references auth.users(id)
);

-- Media versions (version control)
create table public.media_versions (
  id uuid default uuid_generate_v4() primary key,
  media_asset_id uuid references public.media_assets(id) on delete cascade not null,
  version_number integer not null,
  file_url text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id),
  unique(media_asset_id, version_number)
);

-- Media permissions (explicit access control)
create table public.media_permissions (
  id uuid default uuid_generate_v4() primary key,
  media_asset_id uuid references public.media_assets(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  can_view boolean default true,
  can_download boolean default false,
  can_edit boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(media_asset_id, user_id)
);

-- Media credits (who worked on what)
create table public.media_credits (
  id uuid default uuid_generate_v4() primary key,
  media_asset_id uuid references public.media_assets(id) on delete cascade not null,
  name text not null,
  role text not null, -- 'producer', 'engineer', 'writer', 'featured_artist', etc.
  split_percentage numeric(5,2), -- For royalty splits
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- 5. AI INTELLIGENCE LAYER
-- ============================================

-- AI Agents
create table public.ai_agents (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null unique,
  agent_type text not null check (agent_type in ('release_planner', 'a_r_strategy', 'marketing_rollout', 'social_content', 'brand_deal', 'tour_booking', 'artist_development')),
  description text,
  status text not null default 'active' check (status in ('active', 'paused', 'disabled')),
  scope text not null check (scope in ('artist', 'label', 'project')), -- What level can this agent operate at
  can_auto_execute boolean default false, -- If true, can execute without approval
  max_executions_per_day integer default 10
);

-- AI Plans (generated plans awaiting approval)
create table public.ai_plans (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  agent_id uuid references public.ai_agents(id) not null,
  project_id uuid references public.projects(id),
  artist_id uuid references public.artists(id),
  title text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'modified', 'executed')),
  plan_data jsonb not null, -- Structured plan data (goals, steps, timeline, risks, etc.)
  reasoning text, -- AI's reasoning for the plan
  estimated_budget_cents integer,
  estimated_duration_days integer,
  created_for_user uuid references auth.users(id)
);

-- AI Approvals (approval workflow)
create table public.ai_approvals (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.ai_plans(id) on delete cascade not null,
  approved_by uuid references auth.users(id) not null,
  status text not null check (status in ('approved', 'rejected', 'requested_changes')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI Executions (what the AI actually did)
create table public.ai_executions (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.ai_plans(id) on delete cascade not null,
  agent_id uuid references public.ai_agents(id) not null,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  status text not null default 'running' check (status in ('running', 'completed', 'failed', 'cancelled')),
  actions_taken jsonb, -- What actions were performed
  results jsonb, -- Results of the execution
  error_message text
);

-- AI Agent Permissions
create table public.ai_agent_permissions (
  id uuid default uuid_generate_v4() primary key,
  agent_id uuid references public.ai_agents(id) on delete cascade not null,
  resource text not null, -- 'tasks', 'calendar', 'media', etc.
  action text not null, -- 'create', 'read', 'update', 'delete'
  is_allowed boolean default false,
  requires_approval boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(agent_id, resource, action)
);

-- ============================================
-- 6. AUDIT & SECURITY
-- ============================================

-- Audit logs
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id),
  agent_id uuid references public.ai_agents(id),
  action text not null,
  resource_type text not null,
  resource_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text
);

-- ============================================
-- 7. INDEXES FOR PERFORMANCE
-- ============================================

create index idx_user_roles_user_id on public.user_roles(user_id);
create index idx_projects_artist_id on public.projects(artist_id);
create index idx_projects_status on public.projects(status);
create index idx_tasks_assigned_to on public.tasks(assigned_to);
create index idx_tasks_project_id on public.tasks(project_id);
create index idx_tasks_status on public.tasks(status);
create index idx_calendar_events_artist_id on public.calendar_events(artist_id);
create index idx_calendar_events_start_time on public.calendar_events(start_time);
create index idx_artist_team_members_artist_id on public.artist_team_members(artist_id);
create index idx_artist_team_members_user_id on public.artist_team_members(user_id);
create index idx_media_assets_artist_id on public.media_assets(artist_id);
create index idx_media_assets_project_id on public.media_assets(project_id);
create index idx_ai_plans_status on public.ai_plans(status);
create index idx_ai_plans_agent_id on public.ai_plans(agent_id);
create index idx_audit_logs_user_id on public.audit_logs(user_id);
create index idx_audit_logs_created_at on public.audit_logs(created_at);

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all new tables
alter table public.user_roles enable row level security;
alter table public.permissions enable row level security;
alter table public.projects enable row level security;
alter table public.project_phases enable row level security;
alter table public.tasks enable row level security;
alter table public.task_dependencies enable row level security;
alter table public.calendar_events enable row level security;
alter table public.artist_team_members enable row level security;
alter table public.project_collaborators enable row level security;
alter table public.media_assets enable row level security;
alter table public.media_versions enable row level security;
alter table public.media_permissions enable row level security;
alter table public.media_credits enable row level security;
alter table public.ai_agents enable row level security;
alter table public.ai_plans enable row level security;
alter table public.ai_approvals enable row level security;
alter table public.ai_executions enable row level security;
alter table public.ai_agent_permissions enable row level security;
alter table public.audit_logs enable row level security;

-- Basic RLS policies (will be refined based on role)
-- For now, allow authenticated users to read, admins to write

-- User roles - users can read their own role
create policy "Users can read own role" on public.user_roles
  for select using (auth.uid() = user_id);

-- Projects - public read for now (will add role-based later)
create policy "Allow authenticated read access" on public.projects
  for select using (auth.role() = 'authenticated');

-- Tasks - users can see tasks assigned to them
create policy "Users can see assigned tasks" on public.tasks
  for select using (auth.uid() = assigned_to or auth.uid() = created_by);

-- Calendar - authenticated users can read
create policy "Allow authenticated read access" on public.calendar_events
  for select using (auth.role() = 'authenticated');

-- Media - users can see media they have permission for
create policy "Users can see permitted media" on public.media_assets
  for select using (
    exists (
      select 1 from public.media_permissions
      where media_asset_id = id and user_id = auth.uid() and can_view = true
    )
  );

-- AI Plans - authenticated users can read
create policy "Allow authenticated read access" on public.ai_plans
  for select using (auth.role() = 'authenticated');

-- Audit logs - only admins can read (will add admin check later)
create policy "Allow authenticated read access" on public.audit_logs
  for select using (auth.role() = 'authenticated');

-- ============================================
-- 9. SEED DATA - AI AGENTS
-- ============================================

-- Insert default AI agents
insert into public.ai_agents (name, agent_type, description, status, scope, can_auto_execute) values
  ('Release Planner', 'release_planner', 'Plans comprehensive release strategies including timeline, marketing phases, and budget allocation', 'active', 'project', false),
  ('A&R Strategy', 'a_r_strategy', 'Analyzes artist development opportunities and provides strategic recommendations', 'active', 'artist', false),
  ('Marketing Rollout', 'marketing_rollout', 'Creates detailed marketing campaign plans with content calendar and channel strategy', 'active', 'project', false),
  ('Social Content', 'social_content', 'Generates social media content ideas and posting schedules', 'paused', 'artist', false),
  ('Brand Deal Matcher', 'brand_deal', 'Identifies potential brand partnership opportunities based on artist profile', 'paused', 'artist', false),
  ('Tour & Booking', 'tour_booking', 'Plans tour logistics, routing, and booking strategy', 'paused', 'artist', false),
  ('Artist Development', 'artist_development', 'Tracks artist growth metrics and suggests development initiatives', 'active', 'artist', false);

-- ============================================
-- 10. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger set_updated_at before update on public.user_roles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.projects
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.tasks
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.calendar_events
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.media_assets
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.ai_agents
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.ai_plans
  for each row execute function public.handle_updated_at();
