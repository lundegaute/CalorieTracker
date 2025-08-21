// ...existing code...
export default function Home() {
  return (
    <>
      <section className="max-w-4xl mx-auto pt-10 md:pt-20">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
          Track Calories with ease.
        </h2>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl">
          A focused web app to create meals, track calories and macronutrients.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/lundegaute"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-6 py-3 font-medium shadow-lg shadow-emerald-900/40 transition-colors"
          >
            GitHub Profile →
          </a>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-emerald-400/40 hover:border-emerald-300 px-6 py-3 font-medium backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
          >
            Download CV
          </a>
          <a
            href="/recommendation.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-slate-400/30 hover:border-emerald-300 px-6 py-3 font-medium backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
          >
            Recommendation
          </a>
        </div>
      </section>

      <section id="features" className="max-w-5xl mx-auto mt-24">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-2xl font-semibold">Planned Features</h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <StatusDot className="bg-emerald-500" /> Done
            </span>
            <span className="flex items-center gap-1">
              <StatusDot className="bg-amber-400" /> In&nbsp;Progress
            </span>
            <span className="flex items-center gap-1">
              <StatusDot className="bg-rose-500" /> Planned
            </span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Meal Logging"
            status="done"
            description="Quickly add meals & individual foods from Matvaretabellens database."
          />
          <FeatureCard
            title="Calories & macronutrients"
            status="done"
            description="Measure total calorie and macronutrient intake."
          />
          <FeatureCard
            title="Visualize stats"
            status="wip"
            description="Charts to easily show macronutrient distribution."
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-24">
        <h3 className="text-2xl font-semibold mb-4">About</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Frontend built with Next.js, TypeScript, Tailwind, and focused on clean UX for consistent tracking.
          Backend powered by .NET 9 Web API, using Entity Framework Core with MongoDB to store all food data from <a className="text-emerald-300 hover:underline" href="https://www.matvaretabellen.no/api" target="_blank" rel="noopener">https://www.matvaretabellen.no/api</a>.
          And MySql for user data.
        </p>
      </section>
    </>
  );
}

/* Inline component helpers (kept in same file for minimal change) */
function StatusDot({ className }: { className: string }) {
  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ring-2 ring-white/10 shadow ${className}`}
      aria-hidden="true"
    />
  );
}

function FeatureCard({
  title,
  description,
  status
}: {
  title: string;
  description: string;
  status: "done" | "wip" | "planned";
}) {
  const color =
    status === "done"
      ? "bg-emerald-500"
      : status === "wip"
      ? "bg-amber-400"
      : "bg-rose-500";

  const label =
    status === "done" ? "Done" : status === "wip" ? "In Progress" : "Planned";

  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:bg-white/10 transition">
      <div className="flex items-center gap-2 mb-2">
        <StatusDot className={color} />
        <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  );
}
// ...existing code...