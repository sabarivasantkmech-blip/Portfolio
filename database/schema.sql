-- PostgreSQL/Supabase-compatible schema for managing portfolio content.
-- Run this in the production database before importing content.

create table if not exists projects (
  id text primary key,
  title text not null,
  category text not null,
  year text not null,
  description text not null,
  tags text[] not null default '{}',
  gallery_id text,
  article_id text,
  gradient text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists journal_items (
  id text primary key,
  title text not null,
  category text not null,
  format text not null,
  description text not null,
  tags text[] not null default '{}',
  gradient text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_items (
  id text primary key,
  title text not null,
  category text not null,
  placeholder text,
  description text not null,
  image_url text,
  alt_text text,
  gradient text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists articles (
  id text primary key,
  title text not null,
  category text not null,
  read_time text,
  description text not null,
  body text,
  tags text[] not null default '{}',
  gradient text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  source text default 'portfolio',
  created_at timestamptz not null default now()
);

create index if not exists projects_published_order_idx on projects (is_published, sort_order);
create index if not exists journal_published_order_idx on journal_items (is_published, sort_order);
create index if not exists gallery_published_order_idx on gallery_items (is_published, sort_order);
create index if not exists articles_published_order_idx on articles (is_published, sort_order);
