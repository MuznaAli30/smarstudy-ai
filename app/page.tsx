import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] animate-fade-in">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-500/30">
          S
        </div>
        <h1 className="mb-3 text-3xl font-bold gradient-text sm:text-4xl">
          SmartStudy AI
        </h1>
        <p className="mx-auto mb-8 max-w-md text-sm text-muted sm:text-base">
          Your AI-powered study companion. Explain topics, generate quizzes,
          create study plans, and organize notes — all in one place.
        </p>
        <Link
          href="/dashboard"
          className="btn-primary inline-block px-8 py-3 rounded-xl text-sm font-semibold"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
