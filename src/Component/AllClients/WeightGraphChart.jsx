import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const WeightGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [
          {
            label: "Weight",
            data: [63, 64, 65, 64, 66, 64, 67],
            backgroundColor: "rgba(0, 119, 255, 0.1)",
            borderColor: "#0077FF",
            borderWidth: 4, // Thicker line width
            fill: false,
            tension: 0.5, // Increase tension for a wavy line
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#0077FF",
            pointBorderWidth: 4,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} KG`;
              },
              afterLabel: function (context) {
                const date = new Date(2024, 3, context.dataIndex + 1); // April 2024 example
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
              },
            },
            backgroundColor: "#ffffff",
            titleColor: "#333333",
            titleFont: { weight: "bold" },
            bodyColor: "#333333",
            displayColors: false,
            padding: 10,
            cornerRadius: 8, // Rounded tooltip corners
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.15)"
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
        elements: {
          line: {
            capBezierPoints: true, // Round the line edges
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <h2>Weight Graph</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeightGraph;
