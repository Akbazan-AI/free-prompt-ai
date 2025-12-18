'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'prompt-favorites-v1';

// Storage error types
interface StorageError {
  type: 'quota-exceeded' | 'disabled' | 'unknown';
  message: string;
}

// Check if localStorage is available
function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Helper to safely read favorites from localStorage
function readFromStorage(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export interface UseFavoritesResult {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  count: number;
  error: StorageError | null;
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<StorageError | null>(null);

  // Check storage availability on mount
  useEffect(() => {
    if (!isStorageAvailable()) {
      setError({ type: 'disabled', message: 'LocalStorage is not available' });
      return;
    }

    // Initial load
    setFavorites(readFromStorage());

    // Cross-tab sync: update when storage changes in other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveFavorites = useCallback((newFavorites: string[]) => {
    // Update local state first
    setFavorites(newFavorites);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'QuotaExceededError') {
          setError({ type: 'quota-exceeded', message: 'Storage is full' });
        } else {
          setError({ type: 'unknown', message: err.message });
        }
      }
    }
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const current = favorites;
      const newFavorites = current.includes(id)
        ? current.filter((fav) => fav !== id)
        : [...current, id];
      saveFavorites(newFavorites);
    },
    [saveFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  // Memoize the result to avoid unnecessary re-renders
  return useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
    error,
  }), [favorites, toggleFavorite, isFavorite, clearFavorites, error]);
}
