GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated;

DROP POLICY IF EXISTS "Public can view active promotions" ON public.promociones;

CREATE POLICY "Public can view active promotions"
ON public.promociones
FOR SELECT
TO anon, authenticated
USING (vigente = true);