export default function Loading() {
  return (
    <main id="main-content" className="min-h-screen relative pt-32 pb-24 px-4 overflow-hidden z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="h-3 w-24 bg-white/5 rounded-full mb-4 animate-pulse" />
          <div className="h-12 w-64 bg-white/5 rounded-xl animate-pulse" />
        </div>

        <div className="flex flex-wrap gap-3 mb-12 pt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-11 rounded-full bg-white/[0.03] border border-white/10 animate-pulse"
              style={{ width: `${60 + (i % 3) * 20}px` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
