import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../common/Badge';
import Button from '../common/Button';
import BookingRequestModal from '../common/BookingRequestModal';

function RoomCard({ room }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!room) return null;

  const badgeTone = room.isSuperHot ? 'super' : room.isHot ? 'hot' : null;
  const badgeLabel = room.isSuperHot ? 'Super Hot' : room.isHot ? 'Hot' : null;
  const pricePrefix = room.price.toLocaleString();

  const handleBookClick = (e) => {
    e.preventDefault();
    if (user && user.role === 'GUEST') {
      setShowBookingModal(true);
    } else if (user && user.role === 'OWNER') {
      alert('Owners cannot book properties. Switch to Guest account.');
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  };

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <Link to={`/rooms/${room.id}`} className="relative block h-48 overflow-hidden">
          <img
            src={room.image}
            alt={room.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {badgeTone && (
            <div className="absolute left-3 top-3">
              <Badge label={badgeLabel} tone={badgeTone} />
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link to={`/rooms/${room.id}`} className="text-lg font-semibold text-slate-900 hover:text-indigo-700">
                {room.title}
              </Link>
              <span className="rounded-lg bg-slate-50 px-2 py-1 text-xs font-semibold uppercase text-slate-600">
                {room.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {room.area}, {room.city}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-slate-900">
              PKR {pricePrefix}
              <span className="text-xs font-normal text-slate-500"> / {room.priceType}</span>
            </div>
          </div>

          <Button className="w-full" onClick={handleBookClick}>
            Book Now
          </Button>
        </div>
      </div>

      <BookingRequestModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        property={room}
      />
    </>
  );
}

export default RoomCard;
