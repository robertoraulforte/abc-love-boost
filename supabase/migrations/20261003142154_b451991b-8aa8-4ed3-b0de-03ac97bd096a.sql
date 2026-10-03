CREATE TABLE public.simulador_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL CHECK (char_length(nombre) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  es_mar_del_plata boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.simulador_leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.simulador_leads TO authenticated;
GRANT ALL ON public.simulador_leads TO service_role;
ALTER TABLE public.simulador_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.simulador_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view leads" ON public.simulador_leads FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete leads" ON public.simulador_leads FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::app_role));