import { useStore } from '../context/StoreContext';
import { useProducts } from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const { loading, error } = useStore();
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedOrigins,
    toggleOrigin,
    selectedRoast,
    setSelectedRoast,
    origins,
    roasts,
    clearFilters,
    searchRef,
  } = useProducts();

  return (
    <div className="min-h-screen pt-20 bg-stone-50 dark:bg-stone-900/30">
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                The Collection
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold">All Roasts</h1>
              {!loading && (
                <p className="text-stone-500 mt-3">
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'roast' : 'roasts'} found
                </p>
              )}
            </div>
            <div className="w-full md:w-auto">
              <SearchBar
                ref={searchRef}
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search your roast…"
              />
            </div>
          </div>

          {error && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-red-400 block mb-4">error</span>
              <p className="text-stone-600 font-semibold mb-2">Could not load products</p>
              <p className="text-stone-400 text-sm">
                Run <code className="bg-stone-100 px-2 py-0.5 rounded text-xs">npm run server</code> to start json-server on port 3001.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-400">
              <span className="material-symbols-outlined text-5xl">coffee_maker</span>
              <p>Brewing your selection…</p>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col lg:flex-row gap-12">
              <FilterSidebar
                origins={origins}
                roasts={roasts}
                selectedOrigins={selectedOrigins}
                toggleOrigin={toggleOrigin}
                selectedRoast={selectedRoast}
                setSelectedRoast={setSelectedRoast}
                clearFilters={clearFilters}
              />

              <div className="flex-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-5xl text-stone-300 block mb-4">
                      search_off
                    </span>
                    <p className="text-stone-500 text-lg font-medium mb-2">
                      No coffees match your search
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-primary font-semibold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProducts.map(coffee => (
                      <ProductCard key={coffee.id} coffee={coffee} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
