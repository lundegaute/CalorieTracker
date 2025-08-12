
import { MealDetails } from "@/components/DataGrids/MealDetails";
import FoodSearchPanel from "@/components/MealDetails/FoodSearchPanel";


export default async function Meal({ params }: {params: { id: string }}) {
  const mealId = Number(params.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Meal #{mealId}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Review foods, adjust quantities, and monitor macros.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Placeholder for a client AddFood button/form component */}
          {/* <AddFoodButton mealId={mealId} /> */}
        </div>
      </header>

      {/* 3-column responsive layout */}
      <div className="grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
        {/* Left Rail: Actions / Add Food */}
        <aside className="space-y-5 order-last xl:order-first">
          <Panel title="Add Food">
            <FoodSearchPanel />
          </Panel>
        </aside>
        {/* Center: Meal Foods Table */}
        <section
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6
                     shadow-[0_4px_18px_-4px_rgba(0,0,0,0.4)] transition"
          aria-label="Meal items"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Foods In Meal</h2>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4" />
          <div className="flex justify-center">
            <MealDetails id={mealId} />
          </div>
        </section>

        {/* Right Rail: Stats / Charts */}
        <aside className="space-y-5">
          <Panel title="Macro Split">
            <ChartRingPlaceholder />
          </Panel>
          <Panel title="Quick Macros">
            <MiniMetric label="Protein" value="— g" color="text-emerald-300" />
            <MiniMetric label="Carbs" value="— g" color="text-teal-300" />
            <MiniMetric label="Fat" value="— g" color="text-rose-300" />
          </Panel>
        </aside>
      </div>
    </main>
  );
}

/* --- Inline utility components (server-safe; no handlers) --- */

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function MiniMetric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className={`font-semibold tabular-nums ${color || "text-slate-200"}`}>{value}</span>
    </div>
  );
}

function PlaceholderButton({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center rounded-md border border-emerald-400/30 px-3 py-1.5 text-xs font-medium text-emerald-200
                    bg-emerald-500/10 hover:bg-emerald-500/20 transition cursor-not-allowed select-none">
      {label}
    </div>
  );
}

function ChartRingPlaceholder() {
  return (
    <div className="flex items-center justify-center h-44">
      <div className="relative">
        <div className="h-32 w-32 rounded-full border-4 border-emerald-500/60 border-t-transparent animate-spin-slow opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500">
          Coming
        </div>
      </div>
    </div>
  );
}

// (Add spin-slow keyframes in globals.css if not already present)
// @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }