import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/rooms', label: 'Apartments' },
  { to: '/rooms', label: 'Offices' },
  { to: '/aboutus', label: 'About' },
];

function Navbar() {
  const [language, setLanguage] = useState('ENG');
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-sm text-slate-100">
        <div className="flex items-center gap-6">
          <span>📞 +92 300 1234567</span>
          <span>✉️ support@hiremyroom.com</span>
        </div>
        <button
          onClick={() => setLanguage(language === 'ENG' ? 'URD' : 'ENG')}
          className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold uppercase shadow-sm transition hover:bg-slate-700"
        >
          {language}
        </button>
      </div>

      <div className="mx-auto flex w-[92%] max-w-[1600px] items-center justify-between px-2 py-4 sm:px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            HR
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">HireMyRoom</p>
            <p className="text-xs text-slate-500">Find your perfect stay</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? 'text-indigo-700' : 'text-slate-700 hover:text-indigo-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              to={user.role === 'OWNER' ? '/owner/dashboard' : '/guest/booking-requests'}
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-indigo-700">
                Login
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
