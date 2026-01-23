import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { rooms } from '../data/rooms';

const facilities = ['High-speed WiFi', 'Air Conditioning', '24/7 Security', 'Backup Power', 'Parking', 'Cleaning service'];

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = useMemo(() => rooms.find((r) => r.id === id), [id]);

  if (!room) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-lg font-semibold text-slate-900">Room not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/rooms')}>
          Back to rooms
        </Button>
      </div>
    );
  }

  const gallery = [room.image, room.image, room.image];
  const badgeTone = room.isSuperHot ? 'super' : room.isHot ? 'hot' : null;
  const badgeLabel = room.isSuperHot ? 'Super Hot' : room.isHot ? 'Hot' : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={room.image} alt={room.title} className="h-80 w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl border border-slate-200">
                <img src={img} alt={`${room.title}-${idx}`} className="h-24 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{room.type} room</p>
              <h1 className="text-2xl font-bold text-slate-900">{room.title}</h1>
              <p className="text-slate-600">
                {room.area}, {room.city}
              </p>
            </div>
            {badgeTone && <Badge label={badgeLabel} tone={badgeTone} />}
          </div>

          <div className="text-3xl font-bold text-slate-900">
            PKR {room.price.toLocaleString()}
            <span className="text-base font-medium text-slate-500"> / {room.priceType}</span>
          </div>

          <p className="text-slate-700">
            This listing is ready for quick booking once the backend is connected. Expect bright interiors, reliable
            utilities, and responsive support for residents or guests.
          </p>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800">Facilities</p>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility) => (
                <span key={facility} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {facility}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Book Now</Button>
            <Button variant="ghost" className="flex-1" onClick={() => navigate('/rooms')}>
              Back to rooms
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
