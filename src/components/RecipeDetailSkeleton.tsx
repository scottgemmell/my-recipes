/** Shimmer loading placeholder mirroring the recipe detail page layout. */
export default function RecipeDetailSkeleton() {
  return (
    <main className="pb-xl flex-grow">
      {/* Hero */}
      <section className="w-full h-[614px] min-h-[400px] skeleton" />

      {/* Content container (overlaps hero) */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-12 relative z-10">
        <div className="h-8 w-36 skeleton rounded-full mb-md" />

        {/* Header card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg mb-lg">
          <div className="flex flex-col gap-sm md:gap-md">
            <div className="flex gap-sm">
              <div className="h-6 w-20 skeleton rounded" />
              <div className="h-6 w-20 skeleton rounded" />
              <div className="h-6 w-16 skeleton rounded" />
            </div>
            <div className="h-12 w-2/3 skeleton rounded-lg" />
            <div className="space-y-sm">
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-3/4 skeleton rounded" />
            </div>
            <div className="h-5 w-28 skeleton rounded" />
            <div className="flex flex-wrap gap-x-lg gap-y-md pt-md mt-sm border-t border-outline-variant/30">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-sm">
                  <div className="h-6 w-6 skeleton rounded-full" />
                  <div className="space-y-xs">
                    <div className="h-3 w-16 skeleton rounded" />
                    <div className="h-4 w-20 skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg md:gap-gutter items-start">
          {/* Ingredients column */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <div className="h-6 w-32 skeleton rounded mb-md" />
            <div className="flex flex-col gap-md">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-sm">
                  <div className="h-5 w-5 skeleton rounded shrink-0" />
                  <div className="h-4 flex-1 skeleton rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Instructions column */}
          <div className="md:col-span-8 space-y-lg">
            <div className="h-7 w-40 skeleton rounded" />
            <div className="flex flex-col gap-lg">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-md items-start">
                  <div className="h-10 w-12 skeleton rounded shrink-0" />
                  <div className="flex-1 space-y-sm">
                    <div className="h-5 w-1/3 skeleton rounded" />
                    <div className="h-4 w-full skeleton rounded" />
                    <div className="h-4 w-5/6 skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
