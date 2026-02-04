import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import BookingRequestModal from '../components/common/BookingRequestModal';
import { rooms } from '../data/rooms';

const facilities = ['High-speed WiFi', 'Air Conditioning', '24/7 Security', 'Backup Power', 'Parking', 'Cleaning service'];

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const room = useMemo(() => rooms.find((r) => r.id === id), [id]);

  if (!room) {
    return (
      <div className="mx-auto flex min-h-screen w-[92%] max-w-[1600px] items-center px-2 py-16 sm:px-4 sm:py-20">
        <div>
          <p className="text-lg font-semibold text-slate-900">Room not found.</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate('/rooms')}>
            Back to rooms
          </Button>
        </div>
      </div>
    );
  }

  const gallery = [room.image, room.image, room.image];
  const badgeTone = room.isSuperHot ? 'super' : room.isHot ? 'hot' : null;
  const badgeLabel = room.isSuperHot ? 'Super Hot' : room.isHot ? 'Hot' : null;

  return (
    <div className="mx-auto min-h-screen w-[92%] max-w-[1600px] px-2 pt-14 pb-16 sm:px-4 sm:pt-20 sm:pb-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4 sm:space-y-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={room.image} alt={room.title} className="h-80 w-full object-cover sm:h-96" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-slate-200">
                <img src={img} alt={`${room.title}-${idx}`} className="h-24 w-full object-cover sm:h-28" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{room.type} room</p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{room.title}</h1>
              <p className="text-sm text-slate-600">
                {room.area}, {room.city}
              </p>
            </div>
            {badgeTone && <Badge label={badgeLabel} tone={badgeTone} />}
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-slate-900 sm:text-4xl">
              PKR {room.price.toLocaleString()}
              <span className="ml-1 text-base font-medium text-slate-500">/ {room.priceType}</span>
            </div>
            <p className="text-sm text-slate-500">Taxes, utilities, and additional fees are subject to owner policy.</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            This listing is ready for quick booking once the backend is connected. Expect bright interiors, reliable
            utilities, and responsive support for residents or guests.
          </p>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">Facilities</p>
            <div className="flex flex-wrap gap-2.5">
              {facilities.map((facility) => (
                <span
                  key={facility}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:text-[13px]"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row">
            <Button
              className="w-full sm:flex-1"
              onClick={() => {
                if (user && user.role === 'GUEST') {
                  setShowBookingModal(true);
                } else if (user && user.role === 'OWNER') {
                  alert('Owners cannot book properties. Switch to Guest account.');
                } else {
                  navigate('/login');
                }
              }}
            >
              Book Now
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:flex-1"
              onClick={() => navigate('/rooms')}
            >
              Back to rooms
            </Button>
          </div>
        </div>
      </div>

      <BookingRequestModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        property={room}
      />
    </div>
  );
}

export default RoomDetails;
