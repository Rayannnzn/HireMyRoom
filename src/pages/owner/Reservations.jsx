import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../../components/common/Button';

// Mock reservations data
const mockReservations = [
  {
    id: '1',
    guestName: 'Ahmed Ali',
    propertyName: 'Cozy Studio Apartment',
    checkIn: '2024-12-15',
    checkOut: '2024-12-20',
    status: 'Pending',
  },
  {
    id: '2',
    guestName: 'Sara Khan',
    propertyName: 'Luxury Hostel Room',
    checkIn: '2024-12-18',
    checkOut: '2024-12-25',
    status: 'Accepted',
  },
  {
    id: '3',
    guestName: 'Hassan Malik',
    propertyName: 'Budget Room',
    checkIn: '2024-12-10',
    checkOut: '2024-12-12',
    status: 'Rejected',
  },
  {
    id: '4',
    guestName: 'Fatima Sheikh',
    propertyName: 'Cozy Studio Apartment',
    checkIn: '2024-12-22',
    checkOut: '2024-12-28',
    status: 'Pending',
  },
];

function Reservations() {
  const [reservations, setReservations] = useState(mockReservations);
  const [filter, setFilter] = useState('All');

  const handleAccept = (id) => {
    const reservation = reservations.find((r) => r.id === id);
    if (reservation && reservation.status === 'Pending') {
      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r)),
      );
    }
  };

  const handleReject = (id) => {
    const reservation = reservations.find((r) => r.id === id);
    if (reservation && reservation.status === 'Pending') {
      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)),
      );
    }
  };

  const filteredReservations =
    filter === 'All'
      ? reservations
      : reservations.filter((r) => r.status.toLowerCase() === filter.toLowerCase());

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-amber-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700';
      case 'Rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-amber-50 text-amber-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reservations</h1>
          <p className="text-slate-600">Manage booking requests from guests.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Accepted', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Guest Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Check-out
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">{reservation.guestName}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-slate-900">{reservation.propertyName}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                    {reservation.checkIn}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                    {reservation.checkOut}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(
                        reservation.status,
                      )}`}
                    >
                      {getStatusIcon(reservation.status)}
                      {reservation.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    {reservation.status === 'Pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => handleAccept(reservation.id)}
                          className="text-emerald-700 hover:bg-emerald-50"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleReject(reservation.id)}
                          className="text-red-700 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {reservation.status !== 'Pending' && (
                      <span className="text-xs text-slate-500">No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReservations.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-600">No reservations found.</p>
        </div>
      )}
    </div>
  );
}

export default Reservations;
