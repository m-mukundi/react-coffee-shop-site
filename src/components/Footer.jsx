import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">coffee_maker</span>
              <span className="font-display text-2xl font-bold">Coffee R Us</span>
            </div>
            <p className="text-sm leading-relaxed mb-8">
              Crafting the perfect brew since 2010. We partner directly with farmers to ensure
              the highest quality and fair trade practices.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white"
                aria-label="Favorite"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop All Roasts</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Subscription Plan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brewing Guides</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping &amp; Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Newsletter</h5>
            <p className="text-sm mb-6">Join our bean-loving community for exclusive deals.</p>
            <div className="flex gap-2">
              <input
                className="bg-stone-800 border-none rounded-xl px-4 py-3 flex-1 focus:ring-2 focus:ring-primary text-white text-sm outline-none"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-primary text-white px-4 py-3 rounded-xl hover:bg-opacity-90 transition-all">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Coffee R Us Roastery. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Hand-roasted in Portland</span>
            <span>Ethically Sourced</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
