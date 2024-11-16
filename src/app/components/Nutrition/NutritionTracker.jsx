"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

const NutritionTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diet, setDiet] = useState('');
  const [weight, setWeight] = useState(1);
  const [mealType, setMealType] = useState('breakfast');
  const [nutritionData, setNutritionData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [meals, setMeals] = useState([]);

  

  useEffect(() => { 
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedUserId) {
      const fetchTodaysMeals = async () => {
        try {
          const response = await fetch(`http://localhost:3001/nutritionDash/mealsToday/${storedUserId}`);
          if (!response.ok) {
            throw new Error(`Error fetching today's meals: ${response.status}`);
          }
          const data = await response.json();
          setMeals(data);
        } catch (error) {
          console.error("Error fetching today's meals:", error);
        }
      };

      fetchTodaysMeals();
    }
  }, []);
  

  const handleCalculateNutrition = async () => {
    try {
      console.log("Fetching nutrition data for:", diet);
      const response = await fetch(`http://localhost:3001/nutrition/food?query=${diet}`);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Error fetching nutrition data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Nutrition data received:", data);
      
      if (data && data.length > 0) {
        const baseData = data[0];
        console.log("Base data:", baseData);

        const calories = baseData.calories === "Only available for premium subscribers."
          ? baseData.fat_total_g * 9 * weight
          : parseFloat(baseData.calories || 0) * weight;

        const protein = baseData.protein_g === "Only available for premium subscribers."
          ? parseFloat(baseData.potassium_mg || 0) * weight
          : parseFloat(baseData.protein_g || 0) * weight;

        const carbs = baseData.carbohydrates_total_g ? parseFloat(baseData.carbohydrates_total_g) * weight : 0;
        const fat = baseData.fat_total_g ? parseFloat(baseData.fat_total_g) * weight : 0;
        
        const processedData = {
          foodName: diet,
          calories: calories,
          protein_g: protein,
          carbohydrates_total_g: carbs,
          fat_total_g: fat,
          weight: weight,
          mealType: mealType,  // Adding meal type to the processed data
        };

        console.log("Processed data to save:", processedData);

        const saveResponse = await fetch(`http://localhost:3001/nutritionDash/meals/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(processedData),
        });

        console.log("Save response status:", saveResponse.status);
        if (!saveResponse.ok) {
          throw new Error("Failed to save meal data");
        }

        const savedData = await saveResponse.json();
        console.log("Saved data:", savedData);
        setNutritionData(savedData);
        console.log(nutritionData);
        setIsModalOpen(false);
        
      } else {
        throw new Error("No nutrition data available");
      }
    } catch (error) {
      console.error("Error in handleCalculateNutrition:", error);
      setNutritionData(null);
    }
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "0";
    return Math.round(value).toString();
  };

  const renderNutritionCard = (title, value, unit) => (
    <div className="bg-white border p-4 rounded-lg shadow-sm">
      <div className="p-0">
        <p className="text-gray-600 text-sm mb-2">{title}</p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{formatValue(value)}</span>
          <span className="text-gray-500 text-sm ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl  mx-auto">
        <div className="flex justify-between flex-col md:flex-row items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mt-20">Nutrition Tracker</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-6 py-2 rounded-lg transition-colors mt-4 md:mt-20"
          >
            <Plus size={20} />
            Add Meal
          </button>
        </div>

        {nutritionData ? (
          <div className="grid grid-cols-1  md:grid-cols-4 gap-4 mb-8">
            {renderNutritionCard("Total Calories", nutritionData.calories, "kcal")}
            {renderNutritionCard("Protein", nutritionData.protein_g, "g")}
            {renderNutritionCard("Carbs", nutritionData.carbohydrates_g, "g")}
            {renderNutritionCard("Fat", nutritionData.fat_g, "g")}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-600">No meals added yet</h2>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg border shadow-sm p-3 md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Meals</h2>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-gray-100 p-2 md:p-4 rounded-lg flex  justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{meal.meal_type}</p>
                  <p className="text-gray-500 text-sm mt-1">{meal.food_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-medium">{parseFloat(meal.calories).toFixed(2)} kcal</p>
                  <p className="text-gray-500 text-sm">
                    P: {parseFloat(meal.protein_g).toFixed(2)}g • C: {parseFloat(meal.carbohydrates_g).toFixed(2)}g • F: {parseFloat(meal.fat_g).toFixed(2)}g
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {isModalOpen && (
        <div className="fixed inset-0 px-2 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Meal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Item</label>
                <input
                  type="text"
                  placeholder="Enter your meal (e.g., chicken breast)"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(0.1, Number(e.target.value)))}
                  min="0.1"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCalculateNutrition}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;