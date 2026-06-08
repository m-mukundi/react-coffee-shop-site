import { Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <div className="bg-background-light dark:bg-background-dark text-stone-800 dark:text-stone-100 font-sans transition-colors duration-300">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
