export default function Loading() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-emerald-400/30 border-t-emerald-400 animate-spin" aria-label="Loading" />
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  );
}