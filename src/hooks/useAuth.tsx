import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Temporary override while we stabilize the role RPC.
const ADMIN_UUID_OVERRIDE = "59ac60ac-14db-4648-9b41-06123e3b8503";

async function checkIsAdmin(userId: string): Promise<boolean> {
  if (userId === ADMIN_UUID_OVERRIDE) return true;
  // Try RPC first
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (!error && data) return true;
  if (error) console.warn("[useAuth] has_role RPC failed, falling back:", error.message);
  // Fallback: direct table query (RLS allows users to view their own roles)
  const { data: row, error: qErr } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (qErr) console.warn("[useAuth] user_roles fallback failed:", qErr.message);
  return Boolean(row);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        setTimeout(() => {
          checkIsAdmin(newSession.user.id).then(setIsAdmin);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      if (existing?.user) {
        checkIsAdmin(existing.user.id).then((admin) => {
          setIsAdmin(admin);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
