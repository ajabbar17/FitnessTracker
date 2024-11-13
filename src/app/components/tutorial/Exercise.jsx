"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises');
        const data = await response.json();
        setExercises(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load exercises.');
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-24 p-4">
      <h1 className='font-bold text-center text-3xl md:text-5xl pb-5'>Select a Muscle</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise} // Use a unique id as the key
            className="bg-white rounded-lg hover:scale-105 border  justify-center items-center flex flex-col shadow-md p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push(`/tutorials/${exercise}`)}
          >
            <Image
              width={200}
              height={200}
              src={`/${exercise}.png`}
              alt={exercise}
              className="w-1/3h-32 object-fill rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2 capitalize">{exercise}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
}
