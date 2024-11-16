"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController // Register BarController for Bar chart
);

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [caloriesData, setCaloriesData] = useState([]);
  const [proteinData, setProteinData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [userId, setUserId] = useState(null); // Start with null or undefined

 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId); // Debug stored userId

    if (storedUserId) {
      setUserId(storedUserId);
      // Ensure userId is set before making requests
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!userId) return; // Wait until userId is set before fetching data

    const fetchLastSevenDaysData = async () => {
      console.log(userId);
      try {
        const response = await fetch(`http://localhost:3001/nutritionDash/weekly-totals/${userId}`);
        const data = await response.json();

        // Assuming the API returns the data in the format with date, total_calories, total_protein
        const dailyCalories = [];
        const dailyProtein = [];
        const dailyLabels = [];

        data.forEach((item) => {
            dailyLabels.push(new Date(item.date).toLocaleDateString()); // Add formatted date to labels
          dailyCalories.push(item.total_calories); // Add calories for each day
          dailyProtein.push(item.total_protein); // Add protein for each day
        });

        setCaloriesData(dailyCalories);
        setProteinData(dailyProtein);
        setLabels(dailyLabels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLastSevenDaysData();
  }, [userId]);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Calories",
          data: caloriesData,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderRadius: 10, // Rounded corners for bars
        },
        {
          label: "Protein (g)",
          data: proteinData,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderRadius: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: isMobile ? 5 : 7,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: isMobile ? "bottom" : "top",
        },
      },
    };

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart
    }

    const newChart = new ChartJS(chartRef.current, {
      type: "bar", // Correctly specify 'bar' type
      data,
      options,
    });

    setChartInstance(newChart);

    return () => {
      if (newChart) newChart.destroy(); // Cleanup on unmount
    };
  }, [isMobile, caloriesData, proteinData, labels]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "300px" : "500px",
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
