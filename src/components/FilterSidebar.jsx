export default function FilterSidebar({
  origins,
  roasts,
  selectedOrigins,
  toggleOrigin,
  selectedRoast,
  setSelectedRoast,
  clearFilters,
}) {
  const hasFilters = selectedOrigins.length > 0 || !!selectedRoast;

  return (
    <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
      <div>
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">location_on</span>
          Origins
        </h4>
        <div className="space-y-3">
          {origins.map(origin => (
            <label key={origin} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedOrigins.includes(origin)}
                onChange={() => toggleOrigin(origin)}
                className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary accent-primary"
              />
              <span className="group-hover:text-primary transition-colors">{origin}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">local_fire_department</span>
          Roast Level
        </h4>
        <div className="space-y-3">
          {roasts.map(roast => (
            <label key={roast} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="roast-filter"
                checked={selectedRoast === roast}
                onChange={() => setSelectedRoast(selectedRoast === roast ? '' : roast)}
                onClick={() => { if (selectedRoast === roast) setSelectedRoast(''); }}
                className="w-5 h-5 border-stone-300 text-primary focus:ring-primary accent-primary"
              />
              <span className="group-hover:text-primary transition-colors">{roast}</span>
            </label>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
        >
          <span className="material-symbols-outlined text-base">close</span>
          Clear Filters
        </button>
      )}
    </aside>
  );
}
