import { useState } from 'react';
import { useRouter } from 'next/router';

const users = {
  'ion ionita': 'SarpeVeninos@88',
  'monica ionita': '1791',
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (users[username] && users[username] === password) {
      localStorage.setItem('user', username);
      router.push('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}