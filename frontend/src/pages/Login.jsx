import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-indigo-50/20 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Sign in to access your AussieFit aggregator dashboard.</p>
        
        {error && (
          <div className="bg-rose-50 text-rose-700 p-3.5 rounded-xl text-xs font-semibold mb-4 border border-rose-100">
            ⚠️ {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 dark:text-white transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900 dark:text-white transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-650 text-white py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-indigo-100"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-bold">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;