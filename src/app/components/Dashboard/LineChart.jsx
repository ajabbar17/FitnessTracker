"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
);

const LineChart = () => {
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
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: "Calories Burned",
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500)),
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Minutes Worked Out",
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 60)),
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: isMobile ? 5 : 10,
          },
        },
      },
      plugins: {
        legend: {
          position: isMobile ? "bottom" : "top",
        },
      },
    };

    if (chartInstance) {
      chartInstance.destroy(); // Cleanup existing chart
    }

    const newChart = new ChartJS(chartRef.current, {
      type: "line",
      data,
      options,
    });

    setChartInstance(newChart);

    return () => {
      if (newChart) newChart.destroy(); // Cleanup chart on unmount
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

export default LineChart;
