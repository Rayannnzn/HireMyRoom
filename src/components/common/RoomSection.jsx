import RoomCard from '../cards/RoomCard';
import RoomCardSkeleton from '../cards/RoomCardSkeleton';
import ScrollReveal from './ScrollReveal';

/**
 * Reusable section component for displaying a titled grid of room cards.
 *
 * @param {Object} props
 * @param {string} props.title - Section heading
 * @param {string} [props.icon] - Emoji icon before title
 * @param {Array} props.rooms - Array of room objects
 * @param {boolean} [props.isLoading] - Show skeleton placeholders
 * @param {string} [props.viewAllHref] - Link for "View all" button
 * @param {number} [props.delay] - ScrollReveal animation delay
 * @param {number} [props.skeletonCount] - Number of skeletons to show when loading
 */
function RoomSection({
    title,
    icon,
    rooms = [],
    isLoading = false,
    viewAllHref = '/rooms',
    delay = 0,
    skeletonCount = 4,
}) {
    // Don't render the section if there are no rooms and not loading
    if (!isLoading && rooms.length === 0) return null;

    return (
        <ScrollReveal delay={delay}>
            <section className="mt-12 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        {icon && <span className="mr-2">{icon}</span>}
                        {title}
                    </h2>
                    <a
                        href={viewAllHref}
                        className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                    >
                        View all
                    </a>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {isLoading
                        ? Array.from({ length: skeletonCount }, (_, i) => (
                            <RoomCardSkeleton key={i} />
                        ))
                        : rooms.map((room) => <RoomCard key={room.id} room={room} />)}
                </div>
            </section>
        </ScrollReveal>
    );
}

export default RoomSection;
