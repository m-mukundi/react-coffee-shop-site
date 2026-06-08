import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { coffees, storeInfo, loading, error } = useStore();
  const featured = coffees.filter(c => c.featured).slice(0, 3);

  return (
    <>
      <HeroSection storeInfo={storeInfo} />

      <section className="py-24 bg-stone-50 dark:bg-stone-900/30" id="shop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                The Selection
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Roasts</h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View All Roasts
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-400">
              <span className="material-symbols-outlined text-5xl">coffee_maker</span>
              <p>Brewing your selection…</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-red-400 block mb-4">error</span>
              <p className="text-stone-600 font-semibold mb-2">Could not load products</p>
              <p className="text-stone-400 text-sm">
                Run <code className="bg-stone-100 px-2 py-0.5 rounded text-xs">npm run server</code> to start the mock backend on port 3001.
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featured.length > 0 ? (
                featured.map(coffee => <ProductCard key={coffee.id} coffee={coffee} />)
              ) : (
                coffees.slice(0, 3).map(coffee => <ProductCard key={coffee.id} coffee={coffee} />)
              )}
            </div>
          )}

          {!loading && !error && (
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all shadow-xl shadow-primary/30"
              >
                View Full Collection
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Crafted With Passion</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
            Crafting the perfect brew since 2010. We partner directly with farmers to ensure
            the highest quality and fair trade practices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all shadow-xl"
          >
            Shop All Roasts
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
