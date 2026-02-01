import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Edit, Eye, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

// Mock data
const mockProperties = [
  {
    id: '1',
    name: 'Cozy Studio Apartment',
    type: 'Apartment',
    city: 'Karachi',
    area: 'Gulshan-e-Iqbal',
    price: 5000,
    status: 'Active',
    rooms: 3,
  },
  {
    id: '2',
    name: 'Luxury Hostel Room',
    type: 'Hostel',
    city: 'Lahore',
    area: 'DHA Phase 5',
    price: 3500,
    status: 'Active',
    rooms: 5,
  },
  {
    id: '3',
    name: 'Budget Room',
    type: 'Room',
    city: 'Islamabad',
    area: 'F-7',
    price: 2500,
    status: 'Inactive',
    rooms: 2,
  },
];

function ManageProperties() {
  const [properties, setProperties] = useState(mockProperties);
  const [showActions, setShowActions] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter((p) => p.id !== id));
      setShowActions(null);
    }
  };

  const handleStatusToggle = (id) => {
    setProperties(
      properties.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p,
      ),
    );
    setShowActions(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Properties</h1>
          <p className="text-slate-600">View and manage all your listed properties.</p>
        </div>
        <Link to="/owner/add-property">
          <Button>+ Add Property</Button>
        </Link>
      </div>

      {/* Properties Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Property Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Rooms
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">{property.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {property.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-slate-900">{property.area}</div>
                    <div className="text-xs text-slate-600">{property.city}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                    {property.rooms}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                    PKR {property.price.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        property.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusToggle(property.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          property.status === 'Active'
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {property.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === property.id ? null : property.id)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {showActions === property.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                            <button
                              onClick={() => {
                                alert('Edit functionality (UI only)');
                                setShowActions(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                alert('View photos functionality (UI only)');
                                setShowActions(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <Eye className="h-4 w-4" />
                              View Photos
                            </button>
                            <button
                              onClick={() => handleDelete(property.id)}
                              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {properties.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-600">No properties found. Add your first property to get started.</p>
          <Link to="/owner/add-property" className="mt-4 inline-block">
            <Button>Add Property</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ManageProperties;
