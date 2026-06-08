import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useId } from 'react';
import { useStore } from '../context/StoreContext';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coffees, updateCoffee, deleteCoffee, loading } = useStore();

  const coffee = coffees.find(c => String(c.id) === String(id));

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const nameId = useId();
  const priceId = useId();
  const originId = useId();
  const descId = useId();
  const stockId = useId();
  const roastId = useId();

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-stone-300">coffee_maker</span>
      </div>
    );
  }

  if (!coffee) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-6">
        <span className="material-symbols-outlined text-6xl text-stone-300">no_drinks</span>
        <h2 className="font-display text-3xl font-bold">Coffee Not Found</h2>
        <Link
          to="/shop"
          className="flex items-center gap-1 text-primary font-semibold hover:underline"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Shop
        </Link>
      </div>
    );
  }

  const edit = formData || { ...coffee };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...(prev || coffee), [name]: value }));
  };

  const handleEdit = () => {
    setFormData({ ...coffee });
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCoffee(coffee.id, {
        ...edit,
        price: parseFloat(edit.price),
        stock: parseInt(edit.stock) || 0,
      });
      setEditing(false);
      setFormData(null);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(null);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${coffee.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteCoffee(coffee.id);
    navigate('/shop');
  };

  return (
    <div className="min-h-screen pt-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center gap-2 text-sm text-stone-500 mb-10">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-stone-800 dark:text-stone-200">{coffee.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={coffee.image || FALLBACK_IMG}
              alt={coffee.name}
              className="w-full aspect-square object-cover"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {editing ? (
                <>
                  <label htmlFor={roastId} className="sr-only">Roast level</label>
                  <select
                    id={roastId}
                    name="roast"
                    value={edit.roast}
                    onChange={handleChange}
                    className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-none outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option>Light Roast</option>
                    <option>Medium Roast</option>
                    <option>Dark Roast</option>
                  </select>
                </>
              ) : (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {coffee.roast}
                </span>
              )}
              {coffee.featured && (
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            {editing ? (
              <div className="mb-4">
                <label htmlFor={nameId} className="sr-only">Coffee name</label>
                <input
                  id={nameId}
                  name="name"
                  value={edit.name}
                  onChange={handleChange}
                  className="font-display text-4xl font-bold w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ) : (
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{coffee.name}</h1>
            )}

            {editing ? (
              <div className="relative mb-6 inline-flex">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xl">$</span>
                <label htmlFor={priceId} className="sr-only">Price</label>
                <input
                  id={priceId}
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={edit.price}
                  onChange={handleChange}
                  className="text-3xl font-black text-primary pl-9 pr-4 py-2 w-48 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ) : (
              <p className="text-3xl font-black text-primary mb-6">
                ${Number(coffee.price).toFixed(2)}
              </p>
            )}

            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 mb-6">
              <span className="material-symbols-outlined text-primary">location_on</span>
              {editing ? (
                <>
                  <label htmlFor={originId} className="sr-only">Origin</label>
                  <input
                    id={originId}
                    name="origin"
                    value={edit.origin}
                    onChange={handleChange}
                    className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary text-sm font-semibold"
                  />
                </>
              ) : (
                <span className="font-semibold">{coffee.origin}</span>
              )}
            </div>

            {editing ? (
              <div className="mb-6">
                <label htmlFor={descId} className="text-sm font-semibold text-stone-500 mb-2 block">
                  Description
                </label>
                <textarea
                  id={descId}
                  name="description"
                  value={edit.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            ) : (
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                {coffee.description}
              </p>
            )}

            {editing ? (
              <div className="mb-8">
                <label htmlFor={stockId} className="text-sm font-semibold text-stone-500 mb-2 block">
                  Stock (units)
                </label>
                <input
                  id={stockId}
                  name="stock"
                  type="number"
                  min="0"
                  value={edit.stock}
                  onChange={handleChange}
                  className="w-32 px-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ) : (
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  {coffee.stock ?? 0}
                </span>{' '}
                units in stock
              </p>
            )}

            {editing ? (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 border-2 border-stone-200 dark:border-stone-700 py-4 rounded-2xl font-bold text-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1">
                  Add to Cart
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-4 px-6 rounded-2xl font-bold hover:bg-primary/5 transition-all"
                >
                  <span className="material-symbols-outlined">edit</span>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center justify-center gap-2 border-2 border-red-200 dark:border-red-900/50 text-red-500 py-4 px-5 rounded-2xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                  aria-label="Delete product"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
