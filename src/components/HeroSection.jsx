import { Link } from 'react-router-dom';

export default function HeroSection({ storeInfo }) {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Steaming cup of specialty coffee with coffee beans"
          className="w-full h-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE60ehg_ykkEhfuJoZdZbpN7qB1iTroGU6u6T4VcexJKXbQyiK20Uzen9RWK8q3U18-gkqqbFOazXUJuFTgSHMVIJOtzYZuhkJUyDBQvyCe2LTLDterdGLzyLapNjwJJmlrwOAEfEtJqh1ODuncT-6tMBs2hPL_zT-pSzXXwycck_Y_jZuYc5gGc5gLc06cZ-i61GH-MhKVpvcWn0agcQgl38012q7QyHlJW_dPFAJfWf0P5EHx8k7aLLrIcPZgXp4gWP5r8u_oLQ"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/40 to-transparent dark:from-background-dark dark:via-background-dark/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display text-6xl md:text-8xl font-black leading-tight mb-6">
            Coffee <span className="text-primary italic">R</span> Us
          </h1>
          <p className="text-xl md:text-2xl text-stone-700 dark:text-stone-300 mb-10 leading-relaxed font-light">
            {storeInfo?.tagline ||
              "The go-to store for all your coffee needs. From ethical sourcing to precision roasting, we bring the world's finest beans to your cup."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all shadow-xl shadow-primary/30"
            >
              Explore Collection
              <span className="material-symbols-outlined">trending_flat</span>
            </Link>
            <button className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-4 rounded-full text-lg font-semibold hover:bg-primary/5 transition-all">
              Our Story
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
