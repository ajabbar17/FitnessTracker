"use client";
import { useState, useEffect } from 'react';

export default function BodyPartExercises({ exercises, bodyPart }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (exercises && exercises.length > 0) {
            setLoading(false);
        } else {
            setError('No exercises found.');
            setLoading(false);
        }
    }, [exercises]);
    if (bodyPart.includes("%20")) {
        bodyPart = bodyPart.replace("%20", " ");
    }

    if (error) return <div className="text-2xl font-bold pt-72 text-center text-red-500">{error}</div>;

    return (
        <div className="container pt-24 mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6 capitalize">
                Exercises for {bodyPart}
            </h1>
            <div className="grid grid-cols-1 px-4 md:p-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-white rounded-lg hover:scale-105 transition-all hover:shadow-ld flex flex-col justify-center items-center border shadow-md p-2">
                        <h2 className="text-xl font-bold text-center mb-2">{exercise.name}</h2>
                        <p className="mb-4 text-gray-600">Target: {exercise.target}</p>
                        <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            className="w-1/2 h-48 object-cover rounded-lg mb-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
