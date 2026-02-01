import { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock booking requests data
const mockBookingRequests = [
  {
    id: '1',
    propertyName: 'Cozy Studio Apartment',
    propertyImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    checkIn: '2024-12-15',
    checkOut: '2024-12-20',
    status: 'Pending',
    notes: 'Looking for a quiet place to work',
  },
  {
    id: '2',
    propertyName: 'Luxury Hostel Room',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    checkIn: '2024-12-18',
    checkOut: '2024-12-25',
    status: 'Accepted',
    notes: 'Need parking space',
  },
  {
    id: '3',
    propertyName: 'Budget Room',
    propertyImage: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80',
    checkIn: '2024-12-10',
    checkOut: '2024-12-12',
    status: 'Rejected',
    notes: 'Short stay for business trip',
  },
];

function BookingRequests() {
  const [requests] = useState(mockBookingRequests);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-amber-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Booking Requests</h1>
        <p className="text-slate-600">Track the status of your booking requests.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={request.propertyImage}
                alt={request.propertyName}
                className="h-full w-full object-cover"
              />
              <div className={`absolute right-3 top-3 rounded-full border-2 p-1.5 ${getStatusColor(request.status)}`}>
                {getStatusIcon(request.status)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">{request.propertyName}</h3>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-semibold">Check-in:</span> {request.checkIn}
                </p>
                <p>
                  <span className="font-semibold">Check-out:</span> {request.checkOut}
                </p>
              </div>
              {request.notes && (
                <p className="mt-3 text-xs text-slate-500">
                  <span className="font-semibold">Notes:</span> {request.notes}
                </p>
              )}
              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    request.status,
                  )}`}
                >
                  {getStatusIcon(request.status)}
                  {request.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-600">No booking requests yet.</p>
        </div>
      )}
    </div>
  );
}

export default BookingRequests;
