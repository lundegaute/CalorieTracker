import MealNames from "@/components/DataGrids/MealNames";
import AddMealName from "@/components/MealName/AddMealName";
import {ShowTotals} from "@/components/MealName/ShowTotals";
import {MacroDistribution} from "@/components/MealName/MacroDistribution";
import SwitchMealPlans from "@/components/MealName/SwitchMealPlans";

export default function Meals() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            Meals 
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Overview of your logged meals with totals and future insights.
          </p>
        </div>
        <div className="flex gap-3">
          <AddMealName />
        </div>
      </header>

      {/* Layout: Left info rail / Center grid / Right analytics */}
      <div className="grid gap-8 xl:grid-cols-[250px_minmax(0,1fr)_300px]">
        {/* Left Sidebar */}
        <aside className="space-y-5 order-last xl:order-first">
          {/* Create infocard component to load in here  */}
          <ShowTotals />
          <InfoCard title="Last Updated" value={new Date().toLocaleDateString()} hint="Local date" />
        </aside>

        {/* Center (DataGrid) */}
        <section
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6
                     shadow-[0_4px_18px_-4px_rgba(0,0,0,0.4)] hover:bg-white/10 transition"
          aria-label="Meal list"
        >
          <div className="flex items-center justify-between mb-4">
            <SwitchMealPlans />
          </div>
          <div className="flex justify-center">
            <MealNames />
          </div>
        </section>

        {/* Right Sidebar (Analytics placeholders) */}
        <aside className="space-y-5">
          <Panel title="Calories Trend">
            <PlaceholderChart label="Line / Area Chart Placeholder" />
          </Panel>
          <Panel title="Macro Distribution">
            <div className="flex items-center justify-center h-50">
              <div className="relative">
                <MacroDistribution /> {/*  Recharts has been installed, to make better looking charts with small animations. But has not been implemented */}
              </div>
            </div>
          </Panel>
        </aside>
      </div>
    </main>
  );
}

/* --- Small utility components (inline to keep it simple) --- */

function InfoCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 hover:bg-white/10 transition">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-semibold text-emerald-300 tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-[10px] text-slate-500">{hint}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function PlaceholderChart({ label }: { label: string }) {
  return (
    <div className="h-40 rounded-md border border-dashed border-white/15 flex items-center justify-center text-[11px] text-slate-500">
      {label}
    </div>
  );
}
