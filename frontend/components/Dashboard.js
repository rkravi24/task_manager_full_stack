import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    api.get('/auth/dashboard')
      .then((res) => setUserData(res.data))
      .catch(() => router.push('/login'));
  }, []);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {userData ? (
          <>
            <p>Welcome, {userData.name || 'User'}!</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
