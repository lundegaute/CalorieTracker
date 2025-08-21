"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchGet } from "@/Fetch/fetchGet";
import { MealSummary } from "@/Types/types";
import useMealPlanStore from "@/components/Zustand/MealPlanStore";
import {useEffect, useState} from "react";

export function MacroDistribution() {
  const mealPlanStore = useMealPlanStore();
  const [totals, setTotals] = useState({ protein: 0, carb: 0, fat: 0});
  const { data, isLoading } = useQuery<MealSummary[]>({
    queryKey: ["MealsSummary", mealPlanStore.mealPlanId],
    queryFn: () => fetchGet<MealSummary[]>("/api/Meals"),
  });

  
  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = data.filter(meal => meal.mealPlanId === mealPlanStore.mealPlanId);
      const newTotal = calculateTotals(filteredData);
      setTotals(newTotal);
    }
  }, [data, mealPlanStore.mealPlanId]);

  if (isLoading || !data) {
    return <SkeletonDonut />;
  }
  
  function calculateTotals(data: MealSummary[]) {
    const newTotals = data.reduce(
      (acc, m) => {
        acc.protein += m.totalProtein || 0;
        acc.carb += m.totalCarbohydrate || 0;
        acc.fat += m.totalFat || 0;
        return acc;
      },
      { protein: 0, carb: 0, fat: 0 });
      return newTotals;
  };



  const totalAll = totals.protein + totals.carb + totals.fat;
  if (!totalAll) return <div className="text-xs text-slate-500">No macro data yet</div>;

  const segments = [
    { label: "Protein", value: totals.protein, color: "#34d399" },     // emerald-400
    { label: "Carbs", value: totals.carb, color: "#60a5fa" },          // blue-400
    { label: "Fat", value: totals.fat, color: "#fbbf24" },             // amber-400
  ].filter(s => s.value > 0);

  const size = 140;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  // Build stroke segments
  let offsetAcc = 0;
  const circles = segments.map((seg, i) => {
    const dash = (seg.value / totalAll) * circumference;
    const circle = (
      <circle
        key={seg.label}
        r={r}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke={seg.color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={-offsetAcc}
        strokeLinecap="butt"
        className="transition-all"
      />
    );
    offsetAcc += dash;
    return circle;
  });

  const pct = (v: number) => Math.round((v / totalAll) * 100);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
            height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background track */}
          <circle
            r={r}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          {circles}
        </svg>
        <div className="absolute inset-0  flex flex-col items-center justify-center text-[10px] leading-tight text-slate-300">
          <span className="text-[11px] uppercase tracking-wide">{/* Text inside the circle if needed */}</span>
          <span className="text-xs text-slate-500">{/* Text inside the circle */}</span>
        </div>
      </div>
      <ul className="space-y-1 w-full">
        {segments.map(s => (
          <li key={s.label} className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: s.color }}
                aria-hidden
              />
              {s.label}
            </span>
            <span className="tabular-nums text-slate-400">
              {s.value.toFixed(0)}g ({pct(s.value)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkeletonDonut() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-[140px] w-[140px] rounded-full border-4 border-white/10 animate-pulse" />
      <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
      <div className="h-3 w-32 rounded bg-white/10 animate-pulse" />
    </div>
  );
}