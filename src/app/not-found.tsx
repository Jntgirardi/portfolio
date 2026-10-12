import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-dvh flex-col justify-center py-24">
      <p className="eyebrow text-accent">Erro 404</p>
      <h1 className="mt-6 font-display text-6xl tracking-tight md:text-8xl">
        Página não <em className="text-accent">encontrada</em>
      </h1>
      <p className="mt-6 max-w-md text-muted">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm text-bg transition-colors hover:bg-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar ao início
      </Link>
    </main>
  );
}
