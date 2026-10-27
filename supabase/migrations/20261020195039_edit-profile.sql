-- 1) เพิ่ม field ใน profiles (ตารางมีอยู่แล้ว)
alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists phone text,
  add column if not exists bio text,
  add column if not exists birth_date date,
  add column if not exists locale text default 'th';

-- 2) อัปเดต updated_at อัตโนมัติ
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
