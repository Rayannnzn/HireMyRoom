import { useEffect, useMemo, useState } from 'react';
import RoomCard from '../components/cards/RoomCard';
import SearchBar from '../components/common/SearchBar';
import Loader from '../components/common/Loader';
import { fetchRooms } from '../services/roomsApi';

function Rooms() {
  const [filters, setFilters] = useState({ type: '', city: '', area: '', sort: '', query: '' });
  const [rooms, setRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadInitialRooms = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { rooms: fetchedRooms, nextPageUrl: nextUrl, cities: fetchedCities } = await fetchRooms();
        if (!isMounted) return;
        setRooms(fetchedRooms);
        setNextPageUrl(nextUrl);
        setCities(fetchedCities);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Something went wrong while loading rooms.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadInitialRooms();

    return () => {
      isMounted = false;
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

  return (
    <div className="mx-auto w-[92%] max-w-[1600px] px-2 py-10 sm:px-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Browse</p>
        <h1 className="text-3xl font-bold text-slate-900">All rooms & apartments</h1>
        <p className="text-slate-600">
          Search and filter rooms, apartments, hostels, and offices.
        </p>
      </div>

      <div className="mt-6">
        <SearchBar filters={filters} onFilterChange={setFilters} onSearch={setFilters} cities={cities} />
      </div>

      <div className="mt-8">
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
      </div>

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
    </div>
  );
}

export default Rooms;
