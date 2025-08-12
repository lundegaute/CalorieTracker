"use client";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import TextField from "@mui/material/TextField";


const mockFoods = [
  { id: 1, name: "Chicken breast", calories: 165.5, protein: 31, carbohydrates: 0, fat: 3.6 },
  { id: 2, name: "Rice, cooked", calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3 },
  { id: 3, name: "Avocado", calories: 160, protein: 2, carbohydrates: 9, fat: 15 },
  { id: 4, name: "Broccoli, cooked", calories: 55, protein: 3.7, carbohydrates: 11, fat: 0.6 },
  { id: 5, name: "Egg, cooked", calories: 72, protein: 6.3, carbohydrates: 0.6, fat: 4.8 },
];

export default function FoodSearchPanel() {
  const [q, setQ] = useState("");

  const results = q.trim()
    ? mockFoods.filter(f => f.name.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div className="space-y-3">
      <TextField
        fullWidth
        size="small"
        label="Search foods"
        placeholder="Type to search…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="space-y-2 pt-2 max-h-120 overflow-y-auto pr-1">
        {results.map((f) => (
          <div
            key={f.id}
            className="rounded-lg border-2 border-emerald-400/40 bg-white/5 p-3"
          >
            <div className="text-sm font-semibold text-slate-200"> {f.name}</div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300">
              <div>Kcals: <span className="font-medium text-slate-100">{Math.round(f.calories)}</span></div>
              <div>Prot: <span className="font-medium text-slate-100">{f.protein} g</span></div>
              <div>Carbs: <span className="font-medium text-slate-100">{f.carbohydrates} g</span></div>
              <div>Fat: <span className="font-medium text-slate-100">{f.fat} g</span></div>
              <div role="button" onClick={() => {alert(`Food Id: ${f.id}`)}} className="cursor-pointer flex flex-row items-center border-emerald-300 text-emerald-300  hover:text-emerald-600  transition ">
                <p className="">Add</p>
                <AddIcon className="" />
              </div>
            </div>
          </div>
        ))}

        {q && results.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-3">No results</div>
        )}
      </div>
    </div>
  );
}