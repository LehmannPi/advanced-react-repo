import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-neutral-900 pb-24 sm:pb-32">
      {/* Decorative blurred gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex justify-center blur-3xl"
      >
        <div className="aspect-[1200/600] w-[72rem] bg-gradient-to-tr from-emerald-300 via-teal-300 to-green-300 opacity-30" />
      </div>

      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Hero */}
        <section className="pt-28 sm:pt-40 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
            Advanced React Concepts &amp; Architecture
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Hands-on comparisons that showcase how modern React&nbsp;18 features
            improve performance and user experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="#demos"
              className="inline-block rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
            >
              Explore demos
            </Link>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-emerald-300/50 px-6 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
            >
              React 18 docs ↗
            </a>
          </div>
        </section>

        {/* Demo Sections */}
        <section id="demos" className="mt-24 space-y-14">
          {/* Concurrent Mode card */}
          <div className="relative rounded-xl border border-gray-200 dark:border-neutral-700 p-8 lg:p-10 shadow-sm hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600/10 text-emerald-600 text-base font-bold">
                1
              </span>
              Concurrent Mode
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Keep interfaces responsive during intensive renders with{' '}
              <code className="font-mono">startTransition</code> &amp;{' '}
              <code className="font-mono">useDeferredValue</code>.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm">
              <Link
                href="/concurrent-mode/blocking-render"
                className="rounded-lg border border-gray-200 dark:border-neutral-700 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800/60 transition-colors"
              >
                Blocking Render
              </Link>
              <Link
                href="/concurrent-mode/start-transition"
                className="rounded-lg border border-gray-200 dark:border-neutral-700 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800/60 transition-colors"
              >
                Responsive Render
              </Link>
              <Link
                href="/concurrent-mode/blocking-search"
                className="rounded-lg border border-gray-200 dark:border-neutral-700 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800/60 transition-colors"
              >
                Janky Search
              </Link>
              <Link
                href="/concurrent-mode/deferred-value-search"
                className="rounded-lg border border-gray-200 dark:border-neutral-700 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800/60 transition-colors"
              >
                Smooth Search
              </Link>
            </div>

            <Link
              href="/concurrent-mode"
              className="mt-6 inline-block text-emerald-600 hover:underline font-medium"
            >
              View overview ↗
            </Link>
          </div>

          {/* Placeholder for future cards */}
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-8 text-center text-gray-500 dark:text-gray-600">
            More advanced sections coming soon…
          </div>
        </section>
      </main>
    </div>
  );
}
