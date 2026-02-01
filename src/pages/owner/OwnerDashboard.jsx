import { Link } from 'react-router-dom';
import { Building2, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Properties', value: '12', icon: Building2, color: 'indigo' },
  { label: 'Active Reservations', value: '8', icon: Calendar, color: 'emerald' },
  { label: 'Total Revenue', value: 'PKR 450K', icon: DollarSign, color: 'amber' },
  { label: 'This Month', value: 'PKR 125K', icon: TrendingUp, color: 'blue' },
];

function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's an overview of your properties.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            indigo: 'bg-indigo-50 text-indigo-600',
            emerald: 'bg-emerald-50 text-emerald-600',
            amber: 'bg-amber-50 text-amber-600',
            blue: 'bg-blue-50 text-blue-600',
          };
          return (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-3 ${colorClasses[stat.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recent Reservations</h2>
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Guest Name {i}</p>
                  <p className="text-xs text-slate-600">Property Name {i} • Dec 15-20, 2024</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <Link
              to="/owner/add-property"
              className="block rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              + Add New Property
            </Link>
            <Link
              to="/owner/manage-properties"
              className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Manage Properties
            </Link>
            <Link
              to="/owner/reservations"
              className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View All Reservations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
