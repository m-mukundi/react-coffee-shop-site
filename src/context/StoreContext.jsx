import { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext(null);

const API_BASE = 'http://localhost:3001';

export function StoreProvider({ children }) {
  const [coffees, setCoffees] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/coffees`).then(r => r.json()),
      fetch(`${API_BASE}/store_info`).then(r => r.json()),
    ])
      .then(([coffeesData, storeInfoData]) => {
        setCoffees(coffeesData);
        setStoreInfo(storeInfoData[0]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addCoffee = async (newCoffee) => {
    const res = await fetch(`${API_BASE}/coffees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoffee),
    });
    if (!res.ok) throw new Error('Failed to add coffee');
    const added = await res.json();
    setCoffees(prev => [...prev, added]);
    return added;
  };

  const updateCoffee = async (id, updates) => {
    const res = await fetch(`${API_BASE}/coffees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update coffee');
    const updated = await res.json();
    setCoffees(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteCoffee = async (id) => {
    const res = await fetch(`${API_BASE}/coffees/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete coffee');
    setCoffees(prev => prev.filter(c => c.id !== id));
  };

  return (
    <StoreContext.Provider value={{ coffees, storeInfo, loading, error, addCoffee, updateCoffee, deleteCoffee }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export default StoreContext;
