"use client";
import BodyPartExercises from '@/app/components/tutorial/Bodypart';
import React, { useState, useEffect } from 'react';

const ExercisePage = ({ params }) => {
  // Unwrap params using React.use()
  const parameters = React.use(params);
  const exercise = parameters.exercise;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercisesByBodyPart = async () => {
        try {
          console.log(exercise);
        const response = await fetch(`/api/${exercise}`);
        const data = await response.json();
        setExercises(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load exercises.');
        setLoading(false);
      }
    };

    if (exercise) {
      fetchExercisesByBodyPart();
    }
  }, [exercise]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exercises...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
          <p className="text-lg">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BodyPartExercises exercises={exercises} bodyPart={exercise} />
    </div>
  );
};

export default ExercisePage;