import { useState, useId } from 'react';
import { useStore } from '../../context/StoreContext';

const INITIAL_FORM = {
  name: '',
  origin: '',
  description: '',
  price: '',
  roast: 'Medium Roast',
  image: '',
  featured: false,
  stock: '',
};

export default function AddProductForm() {
  const { addCoffee } = useStore();
  const nameId = useId();
  const originId = useId();
  const descId = useId();
  const priceId = useId();
  const roastId = useId();
  const imageId = useId();
  const stockId = useId();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.origin.trim() || !formData.price) {
      setError('Name, origin, and price are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await addCoffee({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      });
      setSuccess(true);
      setFormData(INITIAL_FORM);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError('Failed to add product. Is the json-server running on port 3001?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-900/50 p-8 md:p-12 rounded-[2.5rem] shadow-inner">
      <div className="text-center mb-12">
        <span className="material-symbols-outlined text-primary text-5xl mb-4 block">admin_panel_settings</span>
        <h2 className="font-display text-4xl font-bold mb-2">Add to Collection</h2>
        <p className="text-stone-500">Update our collection or add new inventory</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          Coffee added to the collection!
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={nameId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Coffee Name
            </label>
            <input
              id={nameId}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="e.g. Arabica Gold"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={originId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Origin
            </label>
            <input
              id={originId}
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="e.g. Kenya"
              type="text"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={descId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
            Description
          </label>
          <textarea
            id={descId}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Describe the tasting notes..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={priceId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">$</span>
              <input
                id={priceId}
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-10 pr-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="0.00"
                step="0.01"
                min="0"
                type="number"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor={roastId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Roast Level
            </label>
            <select
              id={roastId}
              name="roast"
              value={formData.roast}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option>Light Roast</option>
              <option>Medium Roast</option>
              <option>Dark Roast</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={imageId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Product Image URL
            </label>
            <input
              id={imageId}
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={stockId} className="text-sm font-semibold text-stone-600 dark:text-stone-400 ml-1 block">
              Stock (units)
            </label>
            <input
              id={stockId}
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="0"
              type="number"
              min="0"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={handleChange}
            className="w-5 h-5 rounded border-stone-300 accent-primary"
          />
          <span className="text-sm font-semibold text-stone-600 dark:text-stone-400">
            Feature on homepage
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 active:translate-y-0 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submitting ? 'Adding to Collection…' : 'Submit Coffee to Collection'}
        </button>
      </form>
    </div>
  );
}
