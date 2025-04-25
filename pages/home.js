import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HomePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
    } else {
      setUser(storedUser);
    }
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://ai-image-backend-1.onrender.com/generate', {
        prompt,
        style: 'fantasy',
        size: '512x512',
        count: 1,
      });
      const imageUrl = res.data.images[0];
      const stored = JSON.parse(localStorage.getItem(user + '-images') || '[]');
      const updated = [...stored, imageUrl];
      localStorage.setItem(user + '-images', JSON.stringify(updated));
      setImages(updated);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem(user + '-images') || '[]');
      setImages(stored);
    }
  }, [user]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user}</h1>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter your fantasy prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt="AI Art" className="rounded shadow" />
        ))}
      </div>
    </div>
  );
}