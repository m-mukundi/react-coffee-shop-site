import { useState, useMemo, useRef } from 'react';
import { useStore } from '../context/StoreContext';

export function useProducts() {
  const { coffees } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedRoast, setSelectedRoast] = useState('');
  const searchRef = useRef(null);

  const origins = useMemo(
    () => [...new Set(coffees.map(c => c.origin))].sort(),
    [coffees]
  );

  const roasts = useMemo(
    () => [...new Set(coffees.map(c => c.roast))],
    [coffees]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return coffees.filter(coffee => {
      const matchesSearch =
        !q ||
        coffee.name.toLowerCase().includes(q) ||
        coffee.description.toLowerCase().includes(q) ||
        coffee.origin.toLowerCase().includes(q) ||
        coffee.roast.toLowerCase().includes(q);

      const matchesOrigin =
        selectedOrigins.length === 0 || selectedOrigins.includes(coffee.origin);

      const matchesRoast = !selectedRoast || coffee.roast === selectedRoast;

      return matchesSearch && matchesOrigin && matchesRoast;
    });
  }, [coffees, searchQuery, selectedOrigins, selectedRoast]);

  const toggleOrigin = (origin) => {
    setSelectedOrigins(prev =>
      prev.includes(origin)
        ? prev.filter(o => o !== origin)
        : [...prev, origin]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedOrigins([]);
    setSelectedRoast('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedOrigins,
    toggleOrigin,
    selectedRoast,
    setSelectedRoast,
    origins,
    roasts,
    clearFilters,
    searchRef,
  };
}
