import { useMemo, useState } from 'react';
import RoomCard from '../components/cards/RoomCard';
import SearchBar from '../components/common/SearchBar';
import { rooms } from '../data/rooms';
import { cities } from '../data/cities';

function Rooms() {
  const [filters, setFilters] = useState({ type: '', city: '', area: '', sort: '', query: '' });

  const filteredRooms = useMemo(() => {
    let result = [...rooms];

    if (filters.type) result = result.filter((room) => room.type === filters.type);
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
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Browse</p>
        <h1 className="text-3xl font-bold text-slate-900">All rooms & apartments</h1>
        <p className="text-slate-600">
          Search and filter rooms, apartments, hostels, and offices. Book now button is ready for backend wiring.
        </p>
      </div>

      <div className="mt-6">
        <SearchBar filters={filters} onFilterChange={setFilters} onSearch={setFilters} cities={cities} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {filteredRooms.length === 0 && <p className="mt-6 text-slate-600">No rooms match your filters yet.</p>}
    </div>
  );
}

export default Rooms;
