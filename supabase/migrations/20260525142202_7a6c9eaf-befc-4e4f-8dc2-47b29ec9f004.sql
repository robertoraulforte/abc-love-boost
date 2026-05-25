-- Restore default API grants stripped during prior security cleanup.
-- RLS policies remain the source of truth; these grants are required for
-- PostgREST (anon/authenticated roles) to even attempt the policy check.

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.promos TO authenticated;
GRANT SELECT ON public.promos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.promociones TO authenticated;
GRANT SELECT ON public.promociones TO anon;

-- Allow the has_role security-definer function to be invoked from RLS
-- policies and via PostgREST RPC by signed-in users.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;