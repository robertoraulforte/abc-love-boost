import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/promos")({
  head: () => ({
    meta: [{ title: "Panel de promociones — ABC Conducción" }],
  }),
  component: AdminPromos,
});

interface Promo {
  id: string;
  title: string;
  description: string | null;
  created_at: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_tipo: string | null;
}

const schema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z.string().trim().max(2000),
});

const empty = { title: "", description: "" };

function AdminPromos() {
  const { user, isAdmin, loading, roleLoading, refreshRole, signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [fetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [removeFile, setRemoveFile] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .schema("public")
        .from("promos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error("Error", { description: error.message });
      setPromos((data ?? []) as Promo[]);
      setFetching(false);
    };
    load();
    const ch = supabase
      .channel("admin-promos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "promos" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [isAdmin]);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setFile(null);
    setRemoveFile(false);
    setOpen(true);
  };
  const openEdit = (p: Promo) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description ?? "" });
    setFile(null);
    setRemoveFile(false);
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Datos inválidos", { description: parsed.error.issues[0].message });
      return;
    }
    setSaving(true);

    let archivo_url: string | null | undefined = undefined;
    let archivo_nombre: string | null | undefined = undefined;
    let archivo_tipo: string | null | undefined = undefined;

    if (file) {
      const MAX = 10 * 1024 * 1024;
      if (file.size > MAX) {
        setSaving(false);
        toast.error("Archivo demasiado grande", { description: "Máximo 10MB." });
        return;
      }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("promos")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) {
        setSaving(false);
        toast.error("Error al subir archivo", { description: upErr.message });
        return;
      }
      const { data: pub } = supabase.storage.from("promos").getPublicUrl(path);
      archivo_url = pub.publicUrl;
      archivo_nombre = file.name;
      archivo_tipo = file.type || ext;
    } else if (removeFile && editing) {
      archivo_url = null;
      archivo_nombre = null;
      archivo_tipo = null;
    }

    const payload: {
      title: string;
      description: string;
      archivo_url?: string | null;
      archivo_nombre?: string | null;
      archivo_tipo?: string | null;
    } = {
      title: parsed.data.title,
      description: parsed.data.description ?? "",
    };
    if (archivo_url !== undefined) {
      payload.archivo_url = archivo_url;
      payload.archivo_nombre = archivo_nombre ?? null;
      payload.archivo_tipo = archivo_tipo ?? null;
    }

    const { error } = editing
      ? await supabase.schema("public").from("promos").update(payload).eq("id", editing.id)
      : await supabase.schema("public").from("promos").insert(payload);
    setSaving(false);
    if (error) {
      toast.error("Error al guardar", { description: error.message });
      return;
    }
    toast.success(editing ? "Promoción actualizada" : "Promoción creada");
    setOpen(false);
  };

  const remove = async (p: Promo) => {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    const { error } = await supabase.schema("public").from("promos").delete().eq("id", p.id);
    if (error) toast.error("Error", { description: error.message });
    else toast.success("Promoción eliminada");
  };

  if (loading || (user && roleLoading)) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (user && !isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4 p-8 text-center">
            <h1 className="text-2xl font-bold">Acceso restringido</h1>
            <p className="text-muted-foreground">
              Tu cuenta no tiene permisos de administrador. Si tu rol fue asignado recientemente, volvé a verificar.
            </p>
            <Button
              onClick={async () => {
                setRefreshing(true);
                const ok = await refreshRole();
                setRefreshing(false);
                if (!ok) toast.error("Sin permisos", { description: "Tu usuario sigue sin rol de administrador." });
              }}
              disabled={refreshing}
              className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
            >
              {refreshing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Volver a verificar permisos
            </Button>
            <Button onClick={signOut} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-black md:text-2xl">Panel de Promociones</h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              ABC Conducción
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/promos">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" /> Ver pública
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">Promociones ({promos.length})</h2>
            <p className="text-sm text-muted-foreground">
              Gestioná las promociones que se muestran en la web.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openCreate}
                className="bg-primary font-bold uppercase text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Nueva promoción
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Editar" : "Nueva"} promoción</DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    maxLength={120}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    maxLength={2000}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="archivo">Archivo (imagen o PDF, opcional)</Label>
                  <Input
                    id="archivo"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] ?? null);
                      setRemoveFile(false);
                    }}
                  />
                  {editing?.archivo_url && !file && !removeFile && (
                    <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs">
                      <a
                        href={editing.archivo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate font-semibold text-primary hover:underline"
                      >
                        {editing.archivo_nombre ?? "Archivo actual"}
                      </a>
                      <button
                        type="button"
                        onClick={() => setRemoveFile(true)}
                        className="font-semibold text-destructive hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  )}
                  {removeFile && (
                    <p className="text-xs text-muted-foreground">
                      El archivo se quitará al guardar.{" "}
                      <button
                        type="button"
                        onClick={() => setRemoveFile(false)}
                        className="font-semibold text-primary hover:underline"
                      >
                        Deshacer
                      </button>
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {fetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : promos.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No hay promociones aún. Creá la primera.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {promos.map((p) => (
              <Card key={p.id}>
                <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold">{p.title}</h3>
                    {p.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    )}
                    {p.created_at && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(p.created_at).toLocaleString("es-AR")}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => remove(p)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
