"use client";
import React, { useEffect, useState } from 'react';
import { FaFire, FaDumbbell, FaClipboardList } from 'react-icons/fa';
import OverviewCard from './OverviewCard';
import BarChart from './BarChart';
import LineChart from './LineChart';

const Dashboard = () => {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [userId, setUserId] = useState(null); // Start with null or undefined

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // Ensure userId is set before making requests
    }
  }, []); // Runs once on component mount to set userId

  useEffect(() => {
    if (!userId) return; // Wait until userId is set before fetching data

    const fetchDailyTotals = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://localhost:3001/nutritionDash/daily-totals/${userId}/${today}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch daily totals");
        }

        const data = await response.json();
        console.log("Daily totals fetched:", data);
        
        setCalories((parseFloat(data.total_calories) || 0).toFixed(2));
        setProtein((parseFloat(data.total_protein) || 0).toFixed(2));
      } catch (error) {
        console.error("Error fetching daily totals:", error);
      }
    };

    const fetchTotalWorkouts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/workouts/number/${userId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch total workouts");
        }

        const data = await response.json();
        const totalWorkouts = data[0]?.count ? parseInt(data[0].count, 10) : 0;
        setWorkouts(totalWorkouts);
        console.log("Total workouts fetched:", totalWorkouts);
      } catch (error) {
        console.error("Error fetching total workouts:", error);
      }
    };

    fetchDailyTotals();
    fetchTotalWorkouts();
  }, [userId]); // Runs when userId is set or updated

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Fitness Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <OverviewCard
          title="Calories Consumed"
          value={`${calories}kcal`}
          icon={<FaFire size={24} className="text-red-500" />}
        />
        <OverviewCard
          title="Protein Intake"
          value={`${protein}g`}
          icon={<FaDumbbell size={24} className="text-blue-500" />}
        />
        <OverviewCard
          title="Total Planned Workouts"
          value={`${workouts}`}
          icon={<FaClipboardList size={24} className="text-green-500" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-200 shadow-md rounded-lg p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Weekly Calorie & Protein Intake</h2>
          <BarChart />
        </div>
        <div className="bg-white shadow-md h-full border-2 border-gray-200 rounded-lg p-2 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Monthly Progress</h2>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
