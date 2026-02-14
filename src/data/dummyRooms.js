/**
 * Dummy room data for sections that don't yet have API backing.
 * Shared between Home.jsx and RoomDetails.jsx so clicking a dummy card
 * renders the same data without an API call.
 */

// Dummy data for "Newly Added Rooms" section
export const newlyAddedRooms = [
    {
        id: 'new-1',
        title: 'Modern Studio Apartment Near Mall Road',
        price: '18000',
        location: 'Mall Road, Lahore',
        room_category: 'luxury',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Room',
        services: 'WiFi, Air Conditioning, Laundry',
        Description: 'A modern studio apartment located near Mall Road. Fully furnished with contemporary decor, high-speed internet, and 24/7 security.',
        bathroom: '1',
        person: 2,
        images: [],
    },
    {
        id: 'new-2',
        title: 'Cozy Room For Students Near LUMS',
        price: '8500',
        location: 'DHA Phase 5, Lahore',
        room_category: 'normal',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Room',
        services: 'WiFi, Study Desk, Shared Kitchen',
        Description: 'Affordable and cozy room ideal for students. Walking distance from LUMS with a quiet study-friendly environment.',
        bathroom: '1',
        person: 1,
        images: [],
    },
    {
        id: 'new-3',
        title: 'Spacious Double Bed Room With Balcony',
        price: '15000',
        location: 'Gulberg III, Lahore',
        room_category: 'vip',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Room',
        services: 'Balcony, Air Conditioning, Parking, Breakfast',
        Description: 'A spacious double bed room with a private balcony overlooking the garden. Located in the heart of Gulberg with easy access to restaurants and markets.',
        bathroom: '1',
        person: 2,
        images: [],
    },
    {
        id: 'new-4',
        title: 'Furnished Room Near Faisal Mosque',
        price: '22000',
        location: 'F-8 Markaz, Islamabad',
        room_category: 'luxury',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Room',
        services: 'WiFi, UPS, Parking, Cleaning Service',
        Description: 'Beautifully furnished room in the prestigious F-8 sector. Minutes away from Faisal Mosque with breathtaking city views.',
        bathroom: '1',
        person: 2,
        images: [],
    },
];

// Dummy data for "Apartments / Villas / Farmhouses" section
export const apartmentsDummy = [
    {
        id: 'apt-1',
        title: 'Luxury 3-Bed Apartment With Pool Access',
        price: '75000',
        location: 'DHA Phase 6, Lahore',
        room_category: 'vvip',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Apartment',
        services: 'Swimming Pool, Gym, 24/7 Security, Parking, Elevator',
        Description: 'Premium 3-bedroom apartment in DHA Phase 6 with pool access, gym facilities, and round-the-clock security.',
        bathroom: '3',
        person: 6,
        images: [],
    },
    {
        id: 'apt-2',
        title: 'Beautiful Farmhouse For Weekend Getaway',
        price: '45000',
        location: 'Bedian Road, Lahore',
        room_category: 'luxury',
        pricing_category: 'Daily',
        room_rank: 'normal',
        type: 'Apartment',
        services: 'BBQ Area, Garden, Swimming Pool, Parking',
        Description: 'Escape the city at this beautiful farmhouse on Bedian Road. Perfect for family gatherings and weekend getaways with BBQ area and swimming pool.',
        bathroom: '4',
        person: 20,
        images: [],
    },
    {
        id: 'apt-3',
        title: 'Premium Villa Near Lake View Park',
        price: '120000',
        location: 'Bahria Town, Islamabad',
        room_category: 'vvip',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Apartment',
        services: 'Garden, Security, Parking, Servant Quarter, Gym',
        Description: 'An extravagant villa in Bahria Town near Lake View Park. Features premium finishes, a private garden, and top-tier security.',
        bathroom: '5',
        person: 10,
        images: [],
    },
    {
        id: 'apt-4',
        title: 'Fully Furnished 2-Bed Apartment',
        price: '35000',
        location: 'Johar Town, Lahore',
        room_category: 'vip',
        pricing_category: 'Monthly',
        room_rank: 'normal',
        type: 'Apartment',
        services: 'WiFi, Air Conditioning, Laundry, Parking',
        Description: 'A fully furnished 2-bedroom apartment in the center of Johar Town. Walking distance from UMT and commercial areas.',
        bathroom: '2',
        person: 4,
        images: [],
    },
];

/** All dummy rooms in a single flat array for lookup. */
export const allDummyRooms = [...newlyAddedRooms, ...apartmentsDummy];

/**
 * Check if a room ID belongs to a dummy room (non-numeric string ID).
 * @param {string|number} id
 * @returns {boolean}
 */
export function isDummyRoomId(id) {
    return typeof id === 'string' && (id.startsWith('new-') || id.startsWith('apt-'));
}

/**
 * Find a dummy room by its ID.
 * @param {string} id
 * @returns {Object|undefined}
 */
export function findDummyRoom(id) {
    return allDummyRooms.find((room) => String(room.id) === String(id));
}
