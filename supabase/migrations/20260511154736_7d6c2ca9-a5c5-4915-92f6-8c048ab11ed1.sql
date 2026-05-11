REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated;

DROP POLICY IF EXISTS "Admins can view all promotions" ON public.promociones;
DROP POLICY IF EXISTS "Admins can insert promotions" ON public.promociones;
DROP POLICY IF EXISTS "Admins can update promotions" ON public.promociones;
DROP POLICY IF EXISTS "Admins can delete promotions" ON public.promociones;

DROP POLICY IF EXISTS "Public can view active promotions" ON public.promociones;
CREATE POLICY "Public can view active promotions"
ON public.promociones
FOR SELECT
TO anon, authenticated
USING (vigente = true);

DROP POLICY IF EXISTS "Admin total access" ON public.promociones;
CREATE POLICY "Admin total access"
ON public.promociones
FOR ALL
TO authenticated
USING (auth.uid() = '59ac60ac-14db-4648-9b41-06123e3b8503'::uuid)
WITH CHECK (auth.uid() = '59ac60ac-14db-4648-9b41-06123e3b8503'::uuid);