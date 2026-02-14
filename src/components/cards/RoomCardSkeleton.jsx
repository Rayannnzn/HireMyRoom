/**
 * Animated skeleton placeholder that mirrors the RoomCard layout.
 * Shown while home data is being fetched.
 */
function RoomCardSkeleton() {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Image placeholder */}
            <div className="h-48 animate-pulse bg-slate-200" />

            <div className="flex flex-1 flex-col gap-3 p-4">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>

                {/* Price */}
                <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />

                {/* Button */}
                <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
            </div>
        </div>
    );
}

export default RoomCardSkeleton;
