DROP POLICY IF EXISTS "Acceso público total para lectura" ON public.promociones;

DROP POLICY IF EXISTS "Public can view active promotions" ON public.promociones;
CREATE POLICY "Public can view active promotions"
ON public.promociones
FOR SELECT
TO anon, authenticated
USING (vigente = true);