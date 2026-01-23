import { useMemo } from 'react';
import Button from './Button';

const propertyTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'normal', label: 'Normal Rooms' },
  { value: 'luxury', label: 'Luxury Rooms' },
  { value: 'vip', label: 'VIP Rooms' },
  { value: 'vvip', label: 'VVIP Rooms' },
];

const priceSortOptions = [
  { value: '', label: 'Sort by price' },
  { value: 'asc', label: 'Lowest to Highest' },
  { value: 'desc', label: 'Highest to Lowest' },
];

function SearchBar({ filters, onFilterChange, onSearch, cities = [] }) {
  const areas = useMemo(() => {
    const city = cities.find((c) => c.id === filters.city);
    return city?.areas ?? [];
  }, [cities, filters.city]);

  const handleChange = (key, value) => {
    onFilterChange?.({ ...filters, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-6"
    >
      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Property</label>
        <select
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none"
        >
          {propertyTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-semibold text-slate-700">City</label>
        <select
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Area</label>
        <select
          value={filters.area}
          onChange={(e) => handleChange('area', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-1">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Price</label>
        <select
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none"
        >
          {priceSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Search</label>
        <div className="flex gap-2">
          <input
            value={filters.query}
            onChange={(e) => handleChange('query', e.target.value)}
            placeholder="Search by title or area..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none"
          />
          <Button type="submit" className="whitespace-nowrap">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
