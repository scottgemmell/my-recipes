/**
 * Shimmer loading placeholders that mirror the real recipe cards, used while the
 * collection (or additional "Load More" recipes) is loading.
 */

/** Skeleton for the large featured card (image left, content right on desktop). */
export function FeaturedCardSkeleton() {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-surface-container-lowest border rounded-lg overflow-hidden flex flex-col sm:flex-row h-full border-outline-variant/30">
      <div className="w-full sm:w-1/2 h-64 sm:h-auto shrink-0 skeleton" />
      <div className="p-md flex flex-col justify-between grow">
        <div className="space-y-sm">
          <div className="flex gap-xs">
            <div className="h-5 w-16 skeleton rounded" />
            <div className="h-5 w-16 skeleton rounded" />
            <div className="h-5 w-12 skeleton rounded" />
          </div>
          <div className="h-9 w-4/5 skeleton rounded" />
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-1/2 skeleton rounded" />
        </div>
        <div className="mt-lg pt-sm border-t border-outline-variant/30">
          <div className="h-5 w-28 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

/** Skeleton for a standard recipe card (image on top). */
export default function CardSkeleton() {
  return (
    <div className="bg-surface-container-lowest border rounded-lg overflow-hidden flex flex-col border-outline-variant/30">
      <div className="w-full h-48 skeleton" />
      <div className="p-md flex flex-col grow">
        <div className="flex justify-between items-start mb-sm">
          <div className="flex gap-xs">
            <div className="h-5 w-14 skeleton rounded" />
            <div className="h-5 w-12 skeleton rounded" />
          </div>
          <div className="h-6 w-6 skeleton rounded-full" />
        </div>
        <div className="h-6 w-3/4 skeleton rounded mb-sm" />
        <div className="space-y-xs">
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-2/3 skeleton rounded" />
        </div>
        <div className="mt-md pt-sm border-t border-outline-variant/30 flex justify-between">
          <div className="h-4 w-12 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
          <div className="h-4 w-10 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}
