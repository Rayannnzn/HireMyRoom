import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { resolveRoomImage } from '../../services/homeApi';
import Badge from '../common/Badge';
import Button from '../common/Button';
import BookingRequestModal from '../common/BookingRequestModal';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80';

function RoomCard({ room }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!room) return null;

  const isSuperHot = room.room_rank === 'super_hot';
  const isHot = room.room_rank === 'hot';
  const badgeTone = isSuperHot ? 'super' : isHot ? 'hot' : null;
  const badgeLabel = isSuperHot ? 'Super Hot' : isHot ? 'Hot' : null;

  const priceNumber = Number(room.price);
  const pricePrefix = Number.isFinite(priceNumber) ? priceNumber.toLocaleString() : room.price;
  const priceType = room.pricing_category || room.priceType || 'month';

  const imageSrc = resolveRoomImage(room) || room.image || PLACEHOLDER_IMAGE;
  const locationText = room.location || [room.area, room.city].filter(Boolean).join(', ');

  const handleBookClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/rooms/${room.id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/rooms/${room.id}`);
          }
        }}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm outline-none transition hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        <div className="relative block h-48 overflow-hidden">
          <img
            src={imageSrc}
            alt={room.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {badgeTone && (
            <div className="absolute left-3 top-3">
              <Badge label={badgeLabel} tone={badgeTone} />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <p className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-indigo-700 md:text-lg">
                {room.title}
              </p>
              <span className="rounded-lg bg-slate-50 px-2 py-1 text-xs font-semibold uppercase text-slate-600">
                {room.room_category || room.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{locationText}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-slate-900">
              PKR {pricePrefix}
              <span className="text-xs font-normal text-slate-500"> / {priceType}</span>
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
