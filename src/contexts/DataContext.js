'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import ApiProvider from '../api/ApiProvider';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await ApiProvider.getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <DataContext.Provider value={{ users }}>
      {children}
    </DataContext.Provider>
  );
};
