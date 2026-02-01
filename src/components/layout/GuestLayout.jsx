import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CheckCircle, User, LogOut } from 'lucide-react';

const navItems = [
  { to: '/guest/booking-requests', label: 'My Booking Requests', icon: Calendar },
  { to: '/guest/bookings', label: 'My Bookings', icon: CheckCircle },
  { to: '/guest/profile', label: 'Profile', icon: User },
];

function GuestLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex w-[92%] max-w-[1600px] items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              HR
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">HireMyRoom</p>
              <p className="text-xs text-slate-500">Guest Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-indigo-700">
              Browse Properties
            </Link>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
              <span className="text-xs text-slate-500">Logged in as</span>
              <span className="text-sm font-semibold text-slate-900">{user?.name || 'Guest'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-[92%] max-w-[1600px] px-4">
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'border-indigo-600 text-indigo-700'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <main className="mx-auto w-[92%] max-w-[1600px] px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default GuestLayout;
