import { useState } from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

// Mock accepted bookings data
const mockBookings = [
  {
    id: '1',
    propertyName: 'Luxury Hostel Room',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    location: 'DHA Phase 5, Lahore',
    checkIn: '2024-12-18',
    checkOut: '2024-12-25',
    price: 3500,
    priceType: 'day',
    totalDays: 7,
  },
  {
    id: '2',
    propertyName: 'Cozy Studio Apartment',
    propertyImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    location: 'Gulshan-e-Iqbal, Karachi',
    checkIn: '2025-01-05',
    checkOut: '2025-01-10',
    price: 5000,
    priceType: 'day',
    totalDays: 5,
  },
];

function MyBookings() {
  const [bookings] = useState(mockBookings);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-slate-600">View your confirmed bookings.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={booking.propertyImage}
                alt={booking.propertyName}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                Confirmed
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">{booking.propertyName}</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {booking.checkIn} to {booking.checkOut}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    PKR {booking.price.toLocaleString()} / {booking.priceType}
                  </span>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Total Amount</span>
                  <span className="text-lg font-bold text-slate-900">
                    PKR {(booking.price * booking.totalDays).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {booking.totalDays} {booking.totalDays === 1 ? 'day' : 'days'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-600">No confirmed bookings yet.</p>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
