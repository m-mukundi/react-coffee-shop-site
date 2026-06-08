import { useState, useId } from 'react';
import { useStore } from '../../context/StoreContext';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80';

export default function ProductEditCard({ coffee }) {
  const { updateCoffee, deleteCoffee } = useStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...coffee });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const priceFieldId = useId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCoffee(coffee.id, {
        name: formData.name,
        origin: formData.origin,
        price: parseFloat(formData.price),
        roast: formData.roast,
        description: formData.description,
        image: formData.image,
        stock: parseInt(formData.stock) || 0,
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...coffee });
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${coffee.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteCoffee(coffee.id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-700 shadow-sm">
      <div className="flex">
        <img
          src={coffee.image || FALLBACK_IMG}
          alt={coffee.name}
          className="w-28 h-auto object-cover flex-shrink-0 self-stretch"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        <div className="flex-1 p-6 min-w-0">
          {editing ? (
            <div className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                placeholder="Coffee name"
              />
              <input
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Origin"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                placeholder="Description"
              />
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <label htmlFor={priceFieldId} className="sr-only">Price</label>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                  <input
                    id={priceFieldId}
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <select
                  name="roast"
                  value={formData.roast}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option>Light Roast</option>
                  <option>Medium Roast</option>
                  <option>Dark Roast</option>
                </select>
              </div>
              <input
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Stock (units)"
              />
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Image URL"
                type="url"
              />
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-primary text-white py-2 rounded-xl font-semibold text-sm hover:bg-opacity-90 disabled:opacity-50 transition-all"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 border-2 border-stone-200 dark:border-stone-700 py-2 rounded-xl font-semibold text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-display font-bold text-lg leading-tight">{coffee.name}</h4>
                <span className="text-primary font-black ml-2 flex-shrink-0">
                  ${Number(coffee.price).toFixed(2)}
                </span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-1">
                {coffee.origin} · {coffee.roast}
              </p>
              <p className="text-stone-400 dark:text-stone-500 text-xs mb-3 line-clamp-2">
                {coffee.description}
              </p>
              <p className="text-stone-400 text-xs mb-4">
                Stock: <span className="font-semibold text-stone-600 dark:text-stone-300">{coffee.stock ?? 0}</span> units
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(true)}
                  className="flex-1 flex items-center justify-center gap-1.5 border-2 border-stone-200 dark:border-stone-700 py-2 rounded-xl text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 hover:border-primary hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center justify-center gap-1 px-4 border-2 border-red-200 dark:border-red-900/50 text-red-500 py-2 rounded-xl text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                  aria-label={`Delete ${coffee.name}`}
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
