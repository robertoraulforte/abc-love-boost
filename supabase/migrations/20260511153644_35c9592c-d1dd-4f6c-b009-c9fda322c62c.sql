DROP POLICY IF EXISTS "Public can view active promotions" ON public.promociones;

CREATE POLICY "Public can view active promotions"
ON public.promociones
FOR SELECT
TO anon
USING (vigente = true);