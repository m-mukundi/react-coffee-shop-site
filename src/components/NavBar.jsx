import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const linkClass = (path) =>
    isActive(path)
      ? 'text-primary font-semibold border-b-2 border-primary pb-1'
      : 'text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors';

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-stone-200/20 bg-white/70 dark:bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">coffee_maker</span>
            <span className="font-display text-2xl font-bold tracking-tight">Coffee R Us</span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/shop" className={linkClass('/shop')}>Shop</Link>
            <Link to="/admin" className={linkClass('/admin')}>Admin Portal</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </Link>
            <Link
              to="/shop"
              className="hidden sm:block bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Shop Now
            </Link>
            <button
              className="md:hidden p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200/20 flex flex-col gap-5 pb-6">
            <Link to="/" className={linkClass('/')} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" className={linkClass('/shop')} onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/admin" className={linkClass('/admin')} onClick={() => setMenuOpen(false)}>Admin Portal</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
