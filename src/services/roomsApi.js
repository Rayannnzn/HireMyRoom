const BASE_URL = 'https://test.hiremyroom.com/public/api/rooms';

export async function fetchRooms(url = BASE_URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }

  const json = await response.json();
  const payload = json?.data;

  if (!payload?.rooms) {
    throw new Error('Invalid rooms response shape');
  }

  const rooms = payload.rooms.data ?? [];
  const nextPageUrl = payload.rooms.next_page_url ?? null;
  const cities = payload.cities ?? [];
  const areas = payload.areas ?? [];

  // Enrich rooms with city/area names if possible
  const cityMap = new Map(cities.map((c) => [c.id, c.name]));
  const areaMap = new Map(areas.map((a) => [a.id, a.name]));

  const normalizedRooms = rooms.map((room) => ({
    ...room,
    city: room.city || cityMap.get(room.city_id) || '',
    area: room.area || areaMap.get(room.area_id) || '',
  }));

  return {
    rooms: normalizedRooms,
    nextPageUrl,
    cities,
    areas,
  };
}

export async function fetchRoomById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch room details');
  }

  const json = await response.json();
  const room =
    json?.data?.room ??
    json?.data ??
    json?.room ??
    null;

  if (!room) {
    throw new Error('Room not found');
  }

  return room;
}

