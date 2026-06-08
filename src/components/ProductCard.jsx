import { Link } from 'react-router-dom';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80';

export default function ProductCard({ coffee }) {
  return (
    <div className="group bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 dark:border-stone-700">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={coffee.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={coffee.image || FALLBACK_IMG}
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-stone-900/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {coffee.roast}
        </div>
      </div>
      <div className="p-8">
        <h4 className="font-display text-2xl font-bold mb-2">{coffee.name}</h4>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-4 line-clamp-2">
          {coffee.description}
        </p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-primary font-bold">{coffee.origin}</span>
          <span className="text-xl font-black">${Number(coffee.price).toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-4 border-2 border-stone-200 dark:border-stone-700 rounded-2xl font-bold group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
            Add to Cart
          </button>
          <Link
            to={`/products/${coffee.id}`}
            className="py-4 px-5 border-2 border-stone-200 dark:border-stone-700 rounded-2xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all flex items-center justify-center"
            aria-label={`View ${coffee.name} details`}
          >
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
