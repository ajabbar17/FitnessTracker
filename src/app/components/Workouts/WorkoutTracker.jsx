"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    planned_date: "",
    status: "planned",
    title: "",
    description: "",
  });
  const [userId, setUserId] = useState(0); // Replace with dynamic userId if applicable.
  const [none, setNone] = useState(false);   

  // Get the userId from localStorage
  useEffect(() => {
    localStorage.getItem("userId") && setUserId(localStorage.getItem("userId"));
  }, []);


  useEffect(() => {
    if (!userId) return;
    const fetchUserWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/workouts/${userId}`
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching user workouts:", error.message);
      }
    };

    fetchUserWorkouts();
  }, [userId]);

  // Add a new workout
  const handleAddWorkout = async () => {
    if (
      newWorkout.title.trim() &&
      newWorkout.description.trim() &&
      newWorkout.planned_date.trim()
    ) {
      try {
        const res = await axios.post("http://localhost:3001/workouts/add", {
          userId: userId,
          plannedDate: newWorkout.planned_date,
          status: newWorkout.status,
          title: newWorkout.title,
          description: newWorkout.description,
        });
        setWorkouts([...workouts, res.data]);
        setNewWorkout({
          title: "",
          description: "",
          planned_date: "",
          status: "planned",
        });
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error adding workout:", err);
      }
    }
  };

  // Delete a workout
  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/workouts/delete/${id}`);
      setWorkouts(workouts.filter((workout) => workout.id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  

return (
    <div className="p-6 max-w-7xl pt-24 mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-3xl font-bold">My Workouts</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center font-bold gap-2 bg-black hover:bg-slate-600 md:text-lg text-xs text-white px-4 py-2 rounded transition-colors"
            >
                <span className="text-xl font-bold">+</span>
                Add Workout
            </button>
        </div>
       
        <div className={`grid ${workouts.length > 0 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex justify-center items-center h-96'} gap-6`}>
  {workouts.length > 0 ? (
    workouts.map((workout) => (
      <div
        key={workout.id}
        className="bg-white hover:scale-105 hover:bg-slate-200 transition-all rounded-lg border-2 shadow-md hover:shadow-lg"
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{workout.title}</h2>
          <button
            onClick={() => handleDeleteWorkout(workout.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{workout.description}</p>
          <p>Planned Date: {new Date(workout.planned_date).toLocaleDateString()}</p>
          <p>Status: {workout.status}</p>
        </div>
      </div>
    ))
  ) : (
    <h1 className="text-center  text-lg md:text-4xl font-bold">
      No workout found. Start by adding a new workout!
    </h1>
  )}
</div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Add New Workout</h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <IoCloseSharp className="font-bold text-2xl" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium mb-1">
                                Workout Title
                            </label>
                            <input
                                type="text"
                                value={newWorkout.title}
                                onChange={(e) =>
                                    setNewWorkout({ ...newWorkout, title: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                value={newWorkout.description}
                                onChange={(e) =>
                                    setNewWorkout({
                                        ...newWorkout,
                                        description: e.target.value,
                                    })
                                }
                                rows={4}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium mb-1">
                                Planned Date
                            </label>
                            <input
                                type="date"
                                value={newWorkout.planned_date}
                                onChange={(e) =>
                                    setNewWorkout({
                                        ...newWorkout,
                                        planned_date: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium mb-1">Status</label>
                            <select
                                value={newWorkout.status}
                                onChange={(e) =>
                                    setNewWorkout({ ...newWorkout, status: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="planned">Planned</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddWorkout}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-slate-600 transition-colors"
                            >
                                Add Workout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);
};

export default WorkoutTracker;
