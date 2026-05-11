
-- Add file fields to promociones
ALTER TABLE public.promociones
  ADD COLUMN IF NOT EXISTS archivo_url text,
  ADD COLUMN IF NOT EXISTS archivo_nombre text,
  ADD COLUMN IF NOT EXISTS archivo_tipo text;

-- Storage bucket for promo files
INSERT INTO storage.buckets (id, name, public)
VALUES ('promos', 'promos', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to promo files
DROP POLICY IF EXISTS "Public can read promo files" ON storage.objects;
CREATE POLICY "Public can read promo files"
ON storage.objects FOR SELECT
USING (bucket_id = 'promos');

-- Admins can upload/update/delete promo files
DROP POLICY IF EXISTS "Admins upload promo files" ON storage.objects;
CREATE POLICY "Admins upload promo files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'promos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins update promo files" ON storage.objects;
CREATE POLICY "Admins update promo files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'promos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins delete promo files" ON storage.objects;
CREATE POLICY "Admins delete promo files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'promos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Grant admin role to whitelisted emails (now and on future signup)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) IN ('leoamorales@gmail.com', 'juanpablogiuliano306@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

CREATE OR REPLACE FUNCTION public.grant_admin_to_whitelist()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) IN ('leoamorales@gmail.com', 'juanpablogiuliano306@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_grant_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_to_whitelist();

-- Replace promociones admin-only policy with has_role
DROP POLICY IF EXISTS "Admin total access" ON public.promociones;
CREATE POLICY "Admins manage promociones"
ON public.promociones
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
