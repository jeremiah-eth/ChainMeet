-- Create profiles table
create table public.profiles (
  wallet_address text primary key,
  display_name text,
  bio text,
  age int,
  location text, -- Text description (e.g. "New York")
  latitude float, -- For Geolocation
  longitude float, -- For Geolocation
  gender text,
  interests text[], -- Array of strings
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create photos table
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.profiles(wallet_address) on delete cascade not null,
  url text not null,
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create matches table
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  user_id_1 text references public.profiles(wallet_address) on delete cascade not null,
  user_id_2 text references public.profiles(wallet_address) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id_1, user_id_2)
);

-- Create messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id text references public.profiles(wallet_address) on delete cascade not null,
  receiver_id text references public.profiles(wallet_address) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blocked_users table
create table public.blocked_users (
  id uuid default gen_random_uuid() primary key,
  blocker_id text references public.profiles(wallet_address) on delete cascade not null,
  blocked_id text references public.profiles(wallet_address) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(blocker_id, blocked_id)
);

-- Create reports table
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  reporter_id text references public.profiles(wallet_address) on delete cascade not null,
  reported_id text references public.profiles(wallet_address) on delete cascade not null,
  reason text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tips table (History of tips sent)
create table public.tips (
  id uuid default gen_random_uuid() primary key,
  sender_id text references public.profiles(wallet_address) on delete cascade not null,
  receiver_id text references public.profiles(wallet_address) on delete cascade not null,
  amount text not null, -- Store as text to handle large numbers/decimals precisely
  tx_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.photos enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;
alter table public.blocked_users enable row level security;
alter table public.reports enable row level security;
alter table public.tips enable row level security;

-- Policies (Simplified for MVP - Open Access)
create policy "Enable all access for profiles" on public.profiles for all using (true);
create policy "Enable all access for photos" on public.photos for all using (true);
create policy "Enable all access for matches" on public.matches for all using (true);
create policy "Enable all access for messages" on public.messages for all using (true);
create policy "Enable all access for blocked_users" on public.blocked_users for all using (true);
create policy "Enable all access for reports" on public.reports for all using (true);
create policy "Enable all access for tips" on public.tips for all using (true);
