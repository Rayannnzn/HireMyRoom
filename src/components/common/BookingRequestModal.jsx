import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

function BookingRequestModal({ isOpen, onClose, property }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date.');
        return;
      }
    }
    
    // Mock submit
    console.log('Booking request submitted:', { property, ...formData });
    alert('Booking request sent successfully! (Mock)');
    setFormData({ checkIn: '', checkOut: '', notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Send Booking Request</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {property && (
            <div className="mb-4 rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{property.title}</p>
              <p className="text-xs text-slate-600">
                {property.area}, {property.city}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                PKR {property.price.toLocaleString()} / {property.priceType}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Check-in Date *
              </label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Check-out Date *
              </label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => {
                  const newCheckOut = e.target.value;
                  // Ensure check-out is after check-in
                  if (formData.checkIn && newCheckOut <= formData.checkIn) {
                    alert('Check-out date must be after check-in date.');
                    return;
                  }
                  setFormData({ ...formData, checkOut: newCheckOut });
                }}
                required
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="3"
                placeholder="Any special requests or notes..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="submit" className="flex-1">
              Send Request
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingRequestModal;
