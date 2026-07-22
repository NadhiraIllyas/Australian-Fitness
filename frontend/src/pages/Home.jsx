import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-zinc-50 to-emerald-50/20 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/10 flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="max-w-4xl text-center space-y-6">
        
        {/* Floating Top Badge */}
        <span className="inline-flex items-center px-4 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/10 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
          🇦🇺 Australia's Premier Fitness Network
        </span>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-none">
          Centralized Fitness Access <br className="hidden md:inline" /> Across <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Australia</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Unlock top-tier gyms, track your active memberships, generate check-in passes, and review weekly activity metrics inside a single unified dashboard [1.1].
        </p>

        {/* Action Button Set */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          {isAuthenticated ? (
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link 
                to="/register" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Join AussieFit Free
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-[1.02]"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Modern Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24 pt-12 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 text-lg">
            📋
          </div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Membership Oversight</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
            Monitor plan details, check remaining coverage durations, and renew plans from one central interface.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 text-lg">
            ⚡
          </div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Dynamic Pass Logs</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
            Generate and register secure check-in passes across multiple partner gym locations on the go.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 text-lg">
            📈
          </div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Activity Analytics</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
            Plot weekly check-in trends and historical visit timelines on a highly clean, interactive interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;