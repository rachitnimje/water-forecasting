// ----------------------COMBINED--------------------------------------
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse";
import { BoxPlot } from "chartjs-chart-box-and-violin-plot";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChennaiReservoirGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "../../../../chennai_reservoir_levels.csv"
        );
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            console.log("Parsed data:", result.data.slice(0, 5)); // Log first 5 rows

            const processedData = processData(result.data);
            if (processedData.length > 0) {
              setChartData(createChartData(processedData));
            } else {
              setError("No valid data found after processing");
            }
          },
          header: true,
          error: (error) => {
            console.error("Parsing error:", error);
            setError("Error parsing CSV file");
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching CSV file");
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    console.log("Processing data...");
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Data is not an array or is empty");
      setError("Invalid data structure");
      return [];
    }

    const dateColumn = "Date";
    const columns = ["POONDI", "CHOLAVARAM", "REDHILLS", "CHEMBARAMBAKKAM"];

    // Check if all required columns are present
    const missingColumns = columns.filter(
      (col) => !data[0].hasOwnProperty(col)
    );
    if (missingColumns.length > 0) {
      console.error(`Missing columns: ${missingColumns.join(", ")}`);
      setError(
        `CSV file structure is missing expected columns: ${missingColumns.join(
          ", "
        )}`
      );
      return [];
    }

    // Group data by year and calculate average water level for all reservoirs
    const yearlyData = data.reduce((acc, row, index) => {
      if (!row[dateColumn] || columns.some((col) => !row[col])) {
        console.log(`Skipping row ${index} due to missing data:`, row);
        return acc;
      }

      const dateParts = row[dateColumn].split("-");
      if (dateParts.length !== 3) {
        console.log(
          `Skipping row ${index} due to invalid date format:`,
          row[dateColumn]
        );
        return acc;
      }

      const year = parseInt(dateParts[2]);
      const values = columns.map((col) => parseFloat(row[col]));

      if (isNaN(year) || values.some(isNaN)) {
        console.log(
          `Skipping row ${index} due to invalid year or water level:`,
          row
        );
        return acc;
      }

      if (!acc[year]) {
        acc[year] = columns.reduce(
          (acc, col) => ({ ...acc, [col]: { sum: 0, count: 0 } }),
          {}
        );
      }

      columns.forEach((col, i) => {
        acc[year][col].sum += values[i];
        acc[year][col].count += 1;
      });

      return acc;
    }, {});

    console.log("Yearly data:", yearlyData);

    // Calculate average for each year for all datasets
    return Object.entries(yearlyData)
      .map(([year, data]) => ({
        year: parseInt(year),
        averages: columns.reduce(
          (acc, col) => ({
            ...acc,
            [col]: data[col].sum / data[col].count,
          }),
          {}
        ),
      }))
      .sort((a, b) => a.year - b.year);
  };

  const createChartData = (processedData) => {
    const colors = {
      POONDI: "rgba(75, 192, 192, 1)",
      CHOLAVARAM: "rgba(255, 99, 132, 1)",
      REDHILLS: "rgba(54, 162, 235, 1)",
      CHEMBARAMBAKKAM: "rgba(153, 102, 255, 1)",
    };
    const backgroundColors = {
      POONDI: "rgba(75, 192, 192, 0.2)",
      CHOLAVARAM: "rgba(255, 99, 132, 0.2)",
      REDHILLS: "rgba(54, 162, 235, 0.2)",
      CHEMBARAMBAKKAM: "rgba(153, 102, 255, 0.2)",
    };

    return {
      labels: processedData.map((item) => item.year),
      datasets: Object.keys(colors).map((col) => ({
        label: `Average ${
          col.charAt(0).toUpperCase() + col.slice(1)
        } Water Level`,
        data: processedData.map((item) => item.averages[col]),
        borderColor: colors[col],
        backgroundColor: backgroundColors[col],
        tension: 0.1,
      })),
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Water Level",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mx-5 mb-5">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Chennai Reservoir Water Levels
      </h2>
      <div className="h-64">
        {error ? (
          <p className="text-center pt-28 text-red-500">{error}</p>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-center pt-28 text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

const ChennaiRainfallGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "../../../../chennai_reservoir_rainfall.csv"
        );
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            console.log("Parsed data:", result.data.slice(0, 5)); // Log first 5 rows

            const processedData = processData(result.data);
            if (processedData.length > 0) {
              setChartData(createChartData(processedData));
            } else {
              setError("No valid data found after processing");
            }
          },
          header: true,
          error: (error) => {
            console.error("Parsing error:", error);
            setError("Error parsing CSV file");
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching CSV file");
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    console.log("Processing data...");
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Data is not an array or is empty");
      setError("Invalid data structure");
      return [];
    }

    const dateColumn = "Date";
    const columns = ["POONDI", "CHOLAVARAM", "REDHILLS", "CHEMBARAMBAKKAM"];

    // Check if all required columns are present
    const missingColumns = columns.filter(
      (col) => !data[0].hasOwnProperty(col)
    );
    if (missingColumns.length > 0) {
      console.error(`Missing columns: ${missingColumns.join(", ")}`);
      setError(
        `CSV file structure is missing expected columns: ${missingColumns.join(
          ", "
        )}`
      );
      return [];
    }

    // Group data by year and calculate average water level for all reservoirs
    const yearlyData = data.reduce((acc, row, index) => {
      if (!row[dateColumn] || columns.some((col) => !row[col])) {
        // console.log(`Skipping row ${index} due to missing data:`, row);
        return acc;
      }

      const dateParts = row[dateColumn].split("-");
      if (dateParts.length !== 3) {
        // console.log(`Skipping row ${index} due to invalid date format:`, row[dateColumn]);
        return acc;
      }

      const year = parseInt(dateParts[2]);
      const values = columns.map((col) => parseFloat(row[col]));

      if (isNaN(year) || values.some(isNaN)) {
        // console.log(`Skipping row ${index} due to invalid year or water level:`, row);
        return acc;
      }

      if (!acc[year]) {
        acc[year] = columns.reduce(
          (acc, col) => ({ ...acc, [col]: { sum: 0, count: 0 } }),
          {}
        );
      }

      columns.forEach((col, i) => {
        acc[year][col].sum += values[i];
        acc[year][col].count += 1;
      });

      return acc;
    }, {});

    console.log("Yearly data:", yearlyData);

    // Calculate average for each year for all datasets
    return Object.entries(yearlyData)
      .map(([year, data]) => ({
        year: parseInt(year),
        averages: columns.reduce(
          (acc, col) => ({
            ...acc,
            [col]: data[col].sum / data[col].count,
          }),
          {}
        ),
      }))
      .sort((a, b) => a.year - b.year);
  };

  const createChartData = (processedData) => {
    const colors = {
      POONDI: "rgba(75, 192, 192, 1)",
      CHOLAVARAM: "rgba(255, 99, 132, 1)",
      REDHILLS: "rgba(54, 162, 235, 1)",
      CHEMBARAMBAKKAM: "rgba(153, 102, 255, 1)",
    };
    const backgroundColors = {
      POONDI: "rgba(75, 192, 192, 0.2)",
      CHOLAVARAM: "rgba(255, 99, 132, 0.2)",
      REDHILLS: "rgba(54, 162, 235, 0.2)",
      CHEMBARAMBAKKAM: "rgba(153, 102, 255, 0.2)",
    };

    return {
      labels: processedData.map((item) => item.year),
      datasets: Object.keys(colors).map((col) => ({
        label: `Average ${
          col.charAt(0).toUpperCase() + col.slice(1)
        } Rainfall level`,
        data: processedData.map((item) => item.averages[col]),
        borderColor: colors[col],
        backgroundColor: backgroundColors[col],
        tension: 0.1,
      })),
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Water Level",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mx-5 mb-5">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Chennai Reservoir Rainfall Levels
      </h2>
      <div className="h-64">
        {error ? (
          <p className="text-center pt-28 text-red-500">{error}</p>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-center pt-28 text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

const ChennaiPopulationBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../../../chennai_population.csv"); // Adjust path as necessary
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            console.log("Parsed data:", result.data.slice(0, 5)); // Log first 5 rows

            const processedData = processData(result.data);
            if (processedData.length > 0) {
              setChartData(createChartData(processedData));
            } else {
              setError("No valid data found after processing");
            }
          },
          header: true,
          error: (error) => {
            console.error("Parsing error:", error);
            setError("Error parsing CSV file");
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching CSV file");
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    console.log("Processing data...");
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Data is not an array or is empty");
      setError("Invalid data structure");
      return [];
    }

    const yearColumn = "year";
    const populationColumn = "population";

    return data.map((row) => ({
      year: row[yearColumn],
      population: parseInt(row[populationColumn], 10),
    }));
  };

  const createChartData = (processedData) => ({
    labels: processedData.map((item) => item.year),
    datasets: [
      {
        label: "Population",
        data: processedData.map((item) => item.population),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg m-5">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Chennai Population
      </h2>
      <div className="h-64">
        {error ? (
          <p className="text-center pt-28 text-red-500">{error}</p>
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-center pt-28 text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

const ChennaiPopulationGrowthChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "../../../../chennai_population_growth.csv"
        );
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            console.log("Parsed data:", result.data.slice(0, 5)); // Log first 5 rows

            const processedData = processData(result.data);
            if (processedData.length > 0) {
              setChartData(createChartData(processedData));
            } else {
              setError("No valid data found after processing");
            }
          },
          header: true,
          error: (error) => {
            console.error("Parsing error:", error);
            setError("Error parsing CSV file");
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching CSV file");
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    console.log("Processing data...");
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Data is not an array or is empty");
      setError("Invalid data structure");
      return [];
    }

    const yearColumn = "year"; // Adjust based on your CSV headers
    const growthColumn = "growth"; // Adjust based on your CSV headers
    const growthRateColumn = "growthRate"; // Adjust based on your CSV headers

    return data.map((row) => ({
      year: row[yearColumn],
      growth: parseFloat(row[growthColumn]),
      growthRate: parseFloat(row[growthRateColumn]),
    }));
  };

  const createChartData = (processedData) => ({
    labels: processedData.map((item) => item.year),
    datasets: [
      {
        type: "bar",
        label: "Growth",
        data: processedData.map((item) => item.growth),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Growth Rate",
        data: processedData.map((item) => item.growthRate),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Growth",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Growth Rate (%)",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          drawOnChartArea: false, // Prevents grid lines from being shown for y1
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg m-5">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Chennai Population Growth and Growth Rate
      </h2>
      <div className="h-64">
        {error ? (
          <p className="text-center pt-28 text-red-500">{error}</p>
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-center pt-28 text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

const ChennaiGroundWaterLevelBoxPlot = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "../../../../chennai_ground_water_level.csv"
        ); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();

        Papa.parse(text, {
          complete: (result) => {
            console.log("Parsed data:", result.data.slice(0, 5)); // Log first 5 rows

            const processedData = processData(result.data);
            if (processedData.length > 0) {
              setChartData(createChartData(processedData));
            } else {
              setError("No valid data found after processing");
            }
          },
          header: true,
          error: (error) => {
            console.error("Parsing error:", error);
            setError("Error parsing CSV file");
          },
        });
      } catch (error) {
        console.error("Error fetching CSV file:", error);
        setError("Error fetching CSV file");
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      setError("Invalid data structure");
      return [];
    }

    return data
      .map((row) => {
        const range = row["Range"]
          .split("-")
          .map((num) => parseFloat(num.trim()));
        if (range.length !== 2) {
          return null;
        }

        const min = Math.min(...range);
        const max = Math.max(...range);
        const q1 = min + (max - min) * 0.25;
        const median = min + (max - min) * 0.5;
        const q3 = min + (max - min) * 0.75;

        return {
          station: row["Station"],
          min: min,
          max: max,
          q1: q1,
          median: median,
          q3: q3,
        };
      })
      .filter((item) => item !== null);
  };

  const createChartData = (processedData) => ({
    labels: processedData.map((item) => item.station),
    datasets: [
      {
        label: "Observed Water Level",
        data: processedData.map((item) => ({
          min: item.min,
          max: item.max,
          q1: item.q1,
          median: item.median,
          q3: item.q3,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Station",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Water Level (m)",
          color: "#e0e0e0",
        },
        ticks: {
          color: "#e0e0e0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg m-5">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Chennai Ground Water Level Box Plot
      </h2>
      <div className="h-64">
        {error ? (
          <p className="text-center pt-28 text-red-500">{error}</p>
        ) : chartData ? (
          <BoxPlot data={chartData} options={options} />
        ) : (
          <p className="text-center pt-28 text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export {
  ChennaiReservoirGraph,
  ChennaiRainfallGraph,
  ChennaiPopulationBarChart,
  ChennaiPopulationGrowthChart,
  ChennaiGroundWaterLevelBoxPlot,
};
