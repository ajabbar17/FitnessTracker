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

  useEffect(() => {
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
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Calories",
          data: [2000, 2100, 2200, 2300, 2400, 2500, 2600],
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderRadius: 10, // Rounded corners for bars
        },
        {
          label: "Protein (g)",
          data: [100, 120, 130, 140, 150, 160, 170],
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
  }, [isMobile]);

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
