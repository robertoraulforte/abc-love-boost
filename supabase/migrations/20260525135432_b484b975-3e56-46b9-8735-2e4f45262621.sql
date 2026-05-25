
-- Remove permissive storage policies on promos bucket
DROP POLICY IF EXISTS "Permitir subida a usuarios autenticados" ON storage.objects;
DROP POLICY IF EXISTS "Admins suben archivos" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Permitir borrado a usuarios autenticados" ON storage.objects;

-- Deduplicate public SELECT policies (keep one)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Permitir lectura publica de objetos" ON storage.objects;

-- Fix promos table policy: restrict to admins
DROP POLICY IF EXISTS "Solo admins manejan promos" ON public.promos;
CREATE POLICY "Admins manage promos"
ON public.promos
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix user_roles permissive SELECT policy and dedupe
DROP POLICY IF EXISTS "Usuarios pueden leer sus propios roles" ON public.user_roles;
DROP POLICY IF EXISTS "Los usuarios pueden ver sus propios roles" ON public.user_roles;
DROP POLICY IF EXISTS "Permitir lectura de rol propio" ON public.user_roles;
-- Keep "Users can view their own roles" and "Admins can view all roles"

-- Remove duplicate has_role(text) overload that is callable by anon/authenticated
DROP FUNCTION IF EXISTS public.has_role(target_role text);
