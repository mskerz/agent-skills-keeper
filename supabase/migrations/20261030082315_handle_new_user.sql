-- 1. ฟังก์ชันจัดการสร้าง profile อัตโนมัติเมื่อมี user ใหม่
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name'
  );
  return new;
end;
$$;

-- 2. Trigger ดักจับ event เมื่อมีแถวใหม่เพิ่มใน auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
