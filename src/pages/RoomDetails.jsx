import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import BookingRequestModal from '../components/common/BookingRequestModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchHomeData, getRoomImageUrl } from '../services/homeApi';
import { isDummyRoomId, findDummyRoom } from '../data/dummyRooms';
import Loader from '../components/common/Loader';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80';

/**
 * Build a gallery array from room.images.
 * Returns objects with { large, small } URLs for main/thumbnail.
 * Falls back to a single placeholder if no images exist.
 */
function buildGallery(room) {
  if (room?.images?.length > 0) {
    return room.images.map((img) => ({
      large: getRoomImageUrl(img.image, 'large'),
      small: getRoomImageUrl(img.image, 'small'),
    }));
  }
  return [{ large: PLACEHOLDER_IMAGE, small: PLACEHOLDER_IMAGE }];
}

/**
 * Find a room by ID across all API arrays.
 * @param {Object} homeData - The full API response data
 * @param {string} id - Room ID to find
 * @returns {Object|undefined}
 */
function findApiRoom(homeData, id) {
  const allRooms = [
    ...(homeData?.superHotRooms ?? []),
    ...(homeData?.hotRooms ?? []),
    ...(homeData?.normalRooms ?? []),
    ...(homeData?.apartments ?? []),
  ];
  return allRooms.find((r) => String(r.id) === String(id));
}

/**
 * Parse services string into an array of facility tags.
 * Handles comma-separated, newline-separated, or combined formats.
 */
function parseServices(services) {
  if (!services) return [];
  return services
    .split(/[,\r\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const isDummy = isDummyRoomId(id);

  useEffect(() => {
    let ignore = false;

    // If it's a dummy room, load from local data — no API call
    if (isDummy) {
      const dummyRoom = findDummyRoom(id);
      if (dummyRoom) {
        setRoom(dummyRoom);
      } else {
        setError('Room not found');
      }
      setIsLoading(false);
      return;
    }

    // API room — fetch from /api/home and find by ID
    const loadRoom = async () => {
      setIsLoading(true);
      setError('');
      try {
        const homeData = await fetchHomeData();
        if (ignore) return;

        const foundRoom = findApiRoom(homeData, id);
        if (!foundRoom) {
          setError('Room not found');
        } else {
          setRoom(foundRoom);
        }
      } catch (err) {
        if (ignore) return;
        setError(err.message || 'Something went wrong while loading room details.');
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadRoom();

    return () => {
      ignore = true;
    };
  }, [id, isDummy]);

  // Derived values
  const isSuperHot = room?.room_rank === 'super_hot';
  const isHot = room?.room_rank === 'hot';
  const badgeTone = isSuperHot ? 'super' : isHot ? 'hot' : null;
  const badgeLabel = isSuperHot ? 'Super Hot' : isHot ? 'Hot' : null;

  const priceNumber = room ? Number(room.price) : null;
  const priceDisplay = room && Number.isFinite(priceNumber) ? priceNumber.toLocaleString() : room?.price;
  const priceType = room?.pricing_category || room?.priceType || 'month';

  const locationText =
    room?.location || [room?.area, room?.city].filter(Boolean).join(', ');

  const gallery = useMemo(() => buildGallery(room), [room]);

  const facilities = useMemo(() => parseServices(room?.services), [room?.services]);

  // Reset image index when room changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [room?.id]);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[500px] w-[92%] max-w-[1600px] items-center justify-center px-2 py-20 sm:px-4">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="mx-auto flex min-h-screen w-[92%] max-w-[1600px] items-center px-2 py-16 sm:px-4 sm:py-20">
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {error || 'Room not found.'}
          </p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-[92%] max-w-[1600px] px-2 pt-16 pb-20 sm:px-4 sm:pt-24 sm:pb-24">
      {/* Page header / breadcrumb */}
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Room details
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {room.title}
          </h1>
          <p className="text-sm text-slate-600">
            {locationText}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700"
          >
            ← Back to home
          </button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        {/* Left: Gallery */}
        <div className="space-y-5 sm:space-y-6">
          {/* Main image */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/5 shadow-sm">
            <img
              src={gallery[activeImageIndex]?.large}
              alt={room.title}
              className="aspect-16/10 w-full object-cover transition-opacity duration-300 sm:aspect-video"
            />

            {gallery.length > 1 && (
              <>
                {/* Left arrow */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev - 1 + gallery.length) % gallery.length,
                    )
                  }
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:bg-white hover:text-slate-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Right arrow */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (prev) => (prev + 1) % gallery.length,
                    )
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:bg-white hover:text-slate-900"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Dots indicator */}
                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                  {gallery.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${idx === activeImageIndex
                        ? 'w-5 bg-white'
                        : 'w-2 bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {gallery.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`group overflow-hidden rounded-2xl border bg-slate-100 transition ${isActive
                      ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                      : 'border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <img
                      src={img.small}
                      alt={`${room.title}-${idx}`}
                      className="h-24 w-full object-cover transition duration-200 group-hover:scale-105 sm:h-28"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-7 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700">
                {room.room_category || room.type} room
              </p>
              <p className="text-xs text-slate-500">Listing ID: {room.id}</p>
            </div>
            {badgeTone && <Badge label={badgeLabel} tone={badgeTone} />}
          </div>

          <div className="space-y-3 border-b border-slate-100 pb-4">
            <div className="text-3xl font-bold text-slate-900 sm:text-4xl">
              PKR {priceDisplay}
              <span className="ml-1 text-base font-medium text-slate-500">/ {priceType}</span>
            </div>
            <p className="text-sm text-slate-500">
              Taxes, utilities, and additional fees are subject to owner policy.
            </p>
          </div>

          {/* Description / Overview */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">Overview</p>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              {room.Description || 'No description available for this listing.'}
            </p>
          </div>

          {/* Room Info Grid */}
          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
            {room.bathroom && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Bathrooms</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{room.bathroom}</p>
              </div>
            )}
            {room.person && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Capacity</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{room.person} {room.person === 1 ? 'person' : 'persons'}</p>
              </div>
            )}
            {room.type && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Type</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{room.type}</p>
              </div>
            )}
            {room.quantity != null && (
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Available</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{room.quantity} {room.quantity === 1 ? 'unit' : 'units'}</p>
              </div>
            )}
          </div>

          {/* Services / Facilities */}
          {facilities.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-800">Services & Facilities</p>
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
          )}

          {/* Video */}
          {room.video && (
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-800">Video Tour</p>
              <video
                controls
                className="w-full rounded-2xl"
                src={`https://test.hiremyroom.com/videos/${room.video}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:mt-4 sm:flex-row">
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
              onClick={() => navigate('/')}
            >
              Back to home
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
