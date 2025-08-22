
import { MealDetails } from "@/components/DataGrids/MealDetails";
import FoodSearchPanel from "@/components/MealDetails/FoodSearchPanel";
import { MacroPieChart } from "@/components/MealDetails/MacroPieChart";
import { QuickMacros } from "@/components/MealDetails/QuickMacros";
import { ShowMealDetailsName} from "@/components/MealName/ShowMealName";

export default async function Meal({ params }: {params: { id: string }}) {
  const mealNameId = Number(params.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
            <ShowMealDetailsName mealNameId={mealNameId}/>
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
            <FoodSearchPanel mealId={mealNameId}/>
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
            <MealDetails mealNameId={mealNameId} />
          </div>
        </section>

        {/* Right Rail: Stats / Charts */}
        <aside className="space-y-5">
          <Panel title="Macro Distribution">
            <MacroPieChart mealNameId={mealNameId} />
          </Panel>
          <Panel title="Quick Macros">
            <QuickMacros mealNameId={mealNameId}/> {/* Show Total calories and macro nutrients for the meal */}
          </Panel>
        </aside>
      </div>
    </main>
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

function PlaceholderButton({ label }: { label: string }) { /* Not in use, but let it stay for now*/
  return (
    <div className="inline-flex items-center rounded-md border border-emerald-400/30 px-3 py-1.5 text-xs font-medium text-emerald-200
                    bg-emerald-500/10 hover:bg-emerald-500/20 transition cursor-not-allowed select-none">
      {label}
    </div>
  );
}


// (Add spin-slow keyframes in globals.css if not already present)
// @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }