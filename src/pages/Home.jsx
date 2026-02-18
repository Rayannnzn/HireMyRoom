import { useMemo, useState } from 'react';
import CategoryCard from '../components/cards/CategoryCard';
import RoomCard from '../components/cards/RoomCard';
import SearchBar from '../components/common/SearchBar';
import ScrollReveal from '../components/common/ScrollReveal';
import Loader from '../components/common/Loader';
import RoomSection from '../components/common/RoomSection';
import { useHomeData } from '../hooks/useHomeData';
import { newlyAddedRooms } from '../data/dummyRooms';

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

  // Fetch home API data
  const { data: homeData, isLoading, error } = useHomeData();

  // All rooms combined for search filtering
  const allRooms = useMemo(() => {
    if (!homeData) return [];
    return [
      ...(homeData.superHotRooms || []),
      ...(homeData.hotRooms || []),
      ...(homeData.normalRooms || []),
    ];
  }, [homeData]);

  const cities = homeData?.cities ?? [];

  const filteredRooms = useMemo(() => {
    let result = [...allRooms];

    if (filters.type) result = result.filter((room) => room.room_category === filters.type);
    if (filters.city) {
      const cityName = cities.find((c) => c.id === filters.city)?.name;
      result = result.filter((room) => room.city?.toLowerCase() === cityName?.toLowerCase());
    }
    if (filters.area) {
      result = result.filter((room) =>
        room.area?.toLowerCase().includes(filters.area.toLowerCase()) ||
        room.location?.toLowerCase().includes(filters.area.toLowerCase()),
      );
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (room) =>
          room.title?.toLowerCase().includes(q) ||
          room.area?.toLowerCase().includes(q) ||
          room.city?.toLowerCase().includes(q) ||
          room.location?.toLowerCase().includes(q),
      );
    }
    if (filters.sort) {
      result.sort((a, b) =>
        filters.sort === 'asc' ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price),
      );
    }
    return result;
  }, [filters, allRooms, cities]);

  const handleCategorySelect = (value) => {
    setActiveCategory(value);
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const hasActiveFilters = filters.type || filters.city || filters.area || filters.sort || filters.query;

  return (
    <div className="mx-auto w-[92%] max-w-1600px px-2 py-10 sm:px-4">


      <ScrollReveal>


    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 animate-gradient-blue px-6 py-10 text-white shadow-2xl">

{/* Blue Glow Blobs */}
<div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400 opacity-30 blur-3xl animate-float-blue"></div>
<div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-400 opacity-30 blur-3xl animate-float-blue"></div>

<div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

  {/* LEFT CONTENT */}
  <div className="max-w-xl space-y-6">
    <p className="inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
      HireMyRoom
    </p>

    <h1 className="text-4xl font-bold leading-tight md:text-5xl">
      Find Rooms. Book Instantly. Move In.
    </h1>

    <p className="text-lg text-indigo-100">
      Discover verified rooms, apartments, hostels and hotels near you.
      Compare prices, explore photos and rent without hassle.
    </p>

  </div>

  {/* GLASS CARD */}
  <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-xl shadow-xl border border-white/20 max-w-sm">
    <p className="text-lg font-semibold">Why HireMyRoom?</p>
    <ul className="mt-4 space-y-3 text-indigo-100 text-sm">
      <li>• Verified Listings</li>
      <li>• Secure Booking System</li>
      <li>• Affordable Options</li>
      <li>• Mobile Friendly</li>
    </ul>
  </div>

</div>
</section>

      
      </ScrollReveal>



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

          {/* Show filtered results only when user is actively searching */}
          {hasActiveFilters && (
            <>
              {isLoading ? (
                <div className="flex min-h-[300px] items-center justify-center py-20">
                  <Loader size="lg" />
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                  {filteredRooms.length === 0 && !error && (
                    <p className="col-span-full text-slate-600">No rooms match your filters yet.</p>
                  )}
                </div>
              )}
            </>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </section>
      </ScrollReveal>

      {/* SECTION 1: Super Hot Rooms */}
      <RoomSection
        title="Super Hot Rooms"
        icon="🔥"
        rooms={homeData?.superHotRooms}
        isLoading={isLoading}
        viewAllHref="/rooms"
        delay={200}
      />

      {/* SECTION 2: Hot Rooms */}
      <RoomSection
        title="Hot Rooms"
        icon="🔥"
        rooms={homeData?.hotRooms}
        isLoading={isLoading}
        viewAllHref="/rooms"
        delay={300}
      />

      {/* SECTION 3: Newly Added Rooms (Dummy Data) */}
      <RoomSection
        title="Newly Added Rooms"
        icon="🆕"
        rooms={newlyAddedRooms}
        isLoading={false}
        viewAllHref="/rooms"
        delay={400}
      />

      {/* SECTION 4: Apartments / Villas / Farmhouses (from /api/home) */}
      <RoomSection
        title="Apartments / Villas / Farmhouses"
        icon="🏠"
        rooms={homeData?.apartments}
        isLoading={isLoading}
        viewAllHref="/rooms"
        delay={500}
      />
    </div>
  );
}

export default Home;
