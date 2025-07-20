import { useState } from 'react';

export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const withLoading = async (callback) => {
    try {
      setError(null);
      startLoading();
      const result = await callback();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    error,
    withLoading,
    startLoading,
    stopLoading,
    setError
  };
}; 