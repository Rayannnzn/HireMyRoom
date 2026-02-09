import { useEffect, useMemo, useState } from 'react';
import CategoryCard from '../components/cards/CategoryCard';
import RoomCard from '../components/cards/RoomCard';
import SearchBar from '../components/common/SearchBar';
import ScrollReveal from '../components/common/ScrollReveal';
import Loader from '../components/common/Loader';
import { fetchRooms } from '../services/roomsApi';

const categories = [
  { label: 'Normal Rooms', value: 'normal', color: 'indigo' },
  { label: 'Luxury Rooms', value: 'luxury', color: 'amber' },
  { label: 'VIP Rooms', value: 'vip', color: 'emerald' },
  { label: 'VVIP Rooms', value: 'vvip', color: 'rose' },
  { label: 'Married Couple Rooms', value: 'vip', color: 'sky' },
];

function Home() {
  const [filters, setFilters] = useState({ type: '', city: '', area: '', sort: '', query: '' });
  const [activeCategory, setActiveCategory] = useState('');
  const [rooms, setRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadInitialRooms = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { rooms: fetchedRooms, nextPageUrl: nextUrl, cities: fetchedCities } = await fetchRooms();
        if (ignore) return;
        setRooms(fetchedRooms);
        setNextPageUrl(nextUrl);
        setCities(fetchedCities);
      } catch (err) {
        if (ignore) return;
        setError(err.message || 'Something went wrong while loading rooms.');
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadInitialRooms();

    return () => {
      ignore = true;
    };
  }, []);

  const handleLoadMore = async () => {
    if (!nextPageUrl || isLoading) return;

    setIsLoading(true);
    setError('');
    try {
      const { rooms: fetchedRooms, nextPageUrl: nextUrl } = await fetchRooms(nextPageUrl);
      setRooms((prev) => [...prev, ...fetchedRooms]);
      setNextPageUrl(nextUrl);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading more rooms.');
    } finally {
      setIsLoading(false);
    }
  };

  const hotRooms = useMemo(
    () => rooms.filter((room) => room.room_rank === 'hot'),
    [rooms],
  );
  const superHotRooms = useMemo(
    () => rooms.filter((room) => room.room_rank === 'super_hot'),
    [rooms],
  );

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    if (filters.type) result = result.filter((room) => room.room_category === filters.type);
    if (filters.city) {
      const cityName = cities.find((c) => c.id === filters.city)?.name;
      result = result.filter((room) => room.city.toLowerCase() === cityName?.toLowerCase());
    }
    if (filters.area) {
      result = result.filter((room) => room.area.toLowerCase().includes(filters.area.toLowerCase()));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (room) =>
          room.title.toLowerCase().includes(q) ||
          room.area.toLowerCase().includes(q) ||
          room.city.toLowerCase().includes(q),
      );
    }
    if (filters.sort) {
      result.sort((a, b) => (filters.sort === 'asc' ? a.price - b.price : b.price - a.price));
    }
    return result;
  }, [filters, rooms, cities]);

  const handleCategorySelect = (value) => {
    setActiveCategory(value);
    setFilters((prev) => ({ ...prev, type: value }));
  };

  return (
    <div className="mx-auto w-[92%] max-w-1600px px-2 py-10 sm:px-4">
      {/* Hero Section */}
      <section className="rounded-3xl bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-10 text-white shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="inline-flex rounded-full bg-indigo-500/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Modern Booking MVP
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">Discover rooms, apartments, hostels & hotels</h1>
            <p className="text-lg text-indigo-100">
              Browse hot and super hot listings, search by city or area, and book instantly when the backend is ready.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
            <p className="font-semibold">Quick facts</p>
            <ul className="mt-2 space-y-1 text-indigo-100">
              <li>• Hot & Super Hot sections</li>
              <li>• Ready for backend wiring</li>
              <li>• Responsive Tailwind UI</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Choose a category */}
      <ScrollReveal>
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Choose a category</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.label}
                label={category.label}
                color={category.color}
                active={activeCategory === category.value}
                onClick={() => handleCategorySelect(category.value)}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Search rooms</h2>
          <SearchBar filters={filters} onFilterChange={setFilters} onSearch={setFilters} cities={cities} />
          {isLoading && rooms.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center py-20">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
              {filteredRooms.length === 0 && !error && (
                <p className="text-slate-600">No rooms match your filters yet.</p>
              )}
            </div>
          )}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex justify-center">
            {nextPageUrl && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader size="sm" />
                    <span>Loading...</span>
                  </span>
                ) : (
                  'Load More'
                )}
              </button>
            )}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Hot Rooms</h2>
            <a href="/rooms" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
              View all
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hotRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Super Hot Rooms</h2>
            <a href="/rooms" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
              View all
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {superHotRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

export default Home;
