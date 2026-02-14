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

    return {
        superHotRooms: payload.superHotRooms ?? [],
        hotRooms: payload.hotRooms ?? [],
        normalRooms: payload.normalRooms ?? [],
        apartments: payload.apartments ?? [],
        cities: payload.cities ?? [],
        areas: payload.areas ?? [],
        reviews: payload.reviews ?? [],
    };
}
