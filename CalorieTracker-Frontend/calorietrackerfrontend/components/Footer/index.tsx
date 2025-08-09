

function Footer() {
    return (
        <footer className="mt-24 border-t border-white/10
                 bg-gradient-to-r from-emerald-900/40 via-slate-900/60 to-slate-950/70
                 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/55
                 px-8 py-6 text-xs text-center text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Calorie Tracker</p>
        <div className="flex gap-4">
          <a href="https://github.com/lundegaute" target="_blank" rel="noopener"
             className="hover:text-emerald-300 transition-colors">GitHub</a>
          <a href="/cv.pdf" className="hover:text-emerald-300 transition-colors">CV</a>
          <a href="/recommendation.pdf" className="hover:text-emerald-300 transition-colors">Recommendation</a>
        </div>
      </div>
        </footer>
    )
}

export default Footer;