import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import AddProductForm from '../components/admin/AddProductForm';
import ProductEditCard from '../components/admin/ProductEditCard';

export default function AdminPage() {
  const { coffees, loading } = useStore();
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="min-h-screen pt-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Admin Portal</h1>
          <p className="text-stone-500 text-lg">Manage your coffee collection</p>
        </div>

        <div className="flex gap-2 mb-10 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'add'
                ? 'bg-white dark:bg-stone-700 text-primary shadow-sm'
                : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'manage'
                ? 'bg-white dark:bg-stone-700 text-primary shadow-sm'
                : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            Manage ({coffees.length})
          </button>
        </div>

        {activeTab === 'add' ? (
          <div className="max-w-4xl mx-auto">
            <AddProductForm />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-3xl font-bold">All Products</h2>
              <span className="text-stone-500 text-sm">{coffees.length} items</span>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-stone-400">
                <span className="material-symbols-outlined text-5xl">coffee_maker</span>
                <p>Loading inventory…</p>
              </div>
            )}

            {!loading && coffees.length === 0 && (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-5xl text-stone-300 block mb-4">
                  inventory_2
                </span>
                <p className="text-stone-500 mb-4">No products yet.</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="text-primary font-semibold hover:underline"
                >
                  Add your first coffee →
                </button>
              </div>
            )}

            {!loading && coffees.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coffees.map(coffee => (
                  <ProductEditCard key={coffee.id} coffee={coffee} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
