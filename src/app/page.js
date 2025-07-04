'use client';

import { useData } from '../contexts/DataContext';

export default function HomePage() {
  const { users } = useData();

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}