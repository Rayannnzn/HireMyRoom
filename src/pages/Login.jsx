import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('GUEST');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    login(email, password, role);
    // Navigate based on role
    if (role === 'OWNER') {
      navigate('/owner/dashboard');
    } else {
      navigate('/guest/booking-requests');
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="text-sm text-slate-600">Access your HireMyRoom account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
          <div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole('GUEST')}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  role === 'GUEST'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Guest
              </button>
              <button
                type="button"
                onClick={() => setRole('OWNER')}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  role === 'OWNER'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Owner
              </button>
            </div>
            <br />
          </div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
