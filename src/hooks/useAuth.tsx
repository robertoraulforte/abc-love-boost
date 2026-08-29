import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  roleLoading: boolean;
  refreshRole: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchIsAdmin(userId: string): Promise<boolean> {
  // Direct query against user_roles (RLS lets users see their own roles).
  const { data, error } = await supabase
    .schema("public")
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) {
    console.warn("[useAuth] user_roles query failed:", error.message);
    return false;
  }
  return Boolean(data);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const currentUserIdRef = useRef<string | null>(null);

  const loadRole = useCallback(async (userId: string): Promise<boolean> => {
    setRoleLoading(true);
    let admin = await fetchIsAdmin(userId);
    // Retry once after a short delay in case the role row was just created by a trigger.
    if (!admin) {
      await new Promise((r) => setTimeout(r, 600));
      admin = await fetchIsAdmin(userId);
    }
    // Only commit if the user hasn't changed in the meantime.
    if (currentUserIdRef.current === userId) {
      setIsAdmin(admin);
      setRoleLoading(false);
    }
    return admin;
  }, []);

  const refreshRole = useCallback(async (): Promise<boolean> => {
    const uid = currentUserIdRef.current;
    if (!uid) {
      setIsAdmin(false);
      setRoleLoading(false);
      return false;
    }
    return loadRole(uid);
  }, [loadRole]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      const u = newSession?.user ?? null;
      setUser(u);
      currentUserIdRef.current = u?.id ?? null;
      if (u) {
        // Defer to avoid awaiting inside the auth callback.
        setTimeout(() => {
          loadRole(u.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setRoleLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      const u = existing?.user ?? null;
      setUser(u);
      currentUserIdRef.current = u?.id ?? null;
      setLoading(false);
      if (u) {
        loadRole(u.id);
      } else {
        setRoleLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadRole]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, roleLoading, refreshRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
