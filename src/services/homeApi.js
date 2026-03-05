const HOME_API_URL = 'https://test.hiremyroom.com/api/home';
const IMAGE_BASE_URL = 'https://test.hiremyroom.com/images';

/**
 * Build the full image URL from an image name and size.
 * @param {string} imageName - e.g. "17383446031.jpg"
 * @param {'small'|'medium'|'large'} size
 * @returns {string}
 */
export function getRoomImageUrl(imageName, size = 'small') {
    return `${IMAGE_BASE_URL}/${size}_${imageName}`;
}

/**
 * Resolve the best image source for a room object.
 * Uses the first entry in room.images array when available.
 * @param {Object} room
 * @param {'small'|'medium'|'large'} size
 * @returns {string|null} Full URL or null if no image exists
 */
export function resolveRoomImage(room, size = 'small') {
    if (room?.images?.length > 0 && room.images[0]?.image) {
        return getRoomImageUrl(room.images[0].image, size);
    }
    return null;
}

/**
 * Fetch the home page data from /api/home.
 * Returns segmented room arrays and metadata.
 */
export async function fetchHomeData() {
    const response = await fetch(HOME_API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch home data');
    }

    const json = await response.json();
    const payload = json?.data;

    if (!payload) {
        throw new Error('Invalid home response shape');
    }

    const superHotRooms = payload.superHotRooms ?? [];
    const hotRooms = payload.hotRooms ?? [];
    const normalRooms = payload.normalRooms ?? [];
    const apartments = payload.apartments ?? [];

    // Combine all rooms and sort by created_at descending for "Newly Added"
    const newlyAddedRooms = [
        ...superHotRooms,
        ...hotRooms,
        ...normalRooms,
        ...apartments,
    ]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 8);

    return {
        superHotRooms,
        hotRooms,
        normalRooms,
        apartments,
        newlyAddedRooms,
        cities: payload.cities ?? [],
        areas: payload.areas ?? [],
        reviews: payload.reviews ?? [],
    };
}
