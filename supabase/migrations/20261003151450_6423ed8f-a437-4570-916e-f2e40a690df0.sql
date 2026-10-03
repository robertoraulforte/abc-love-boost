DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.simulador_leads;
REVOKE INSERT ON public.simulador_leads FROM anon, authenticated;
DROP POLICY IF EXISTS "Acceso público de lectura" ON storage.objects;
CREATE POLICY "Admins list promo files" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'promos' AND private.has_role(auth.uid(), 'admin'::app_role));