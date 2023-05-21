import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns";

Chart.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const names = {
  Temperature: {
    path: "temp",
    color: "#FF6E40",
  },
  Humid: {
    path: "humid",
    color: "#7ba0ff",
  },
  Light: {
    path: "light",
    color: "#FFCF53",
  },
  "PM 2.5": {
    path: "dust",
    color: "#a144f2",
  },
};

export type NameType = keyof typeof names;
interface Prop {
  name: NameType;
}

export default function LineChart(prop: Prop) {
  const data = {
    datasets: [
      {
        label: prop.name,
        data: [
          {
            x: 1684582857548,
            y: 24,
          },
          {
            x: 1684602857548,
            y: 20,
          },
          {
            x: 1684622857700,
            y: 30,
          },
          {
            x: 1684642857800,
            y: 37,
          },
          {
            x: 1684682857900,
            y: 15,
          },
          {
            x: 1684707858000,
            y: 24,
          },
          {
            x: 1684747859000,
            y: 20,
          },
          {
            x: 1684787959000,
            y: 20,
          },
        ],
        fill: false,
        borderColor: names[prop.name].color,
        tension: 0.1,
      },
    ],
  };
  const [graphData, setGraphData] = useState(data);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://144.24.138.249:5000/today/${names[prop.name].path}`
      );
      // Handle the response data here

      let newdatasets = [
        {
          label: prop.name,
          data: response.data,
          fill: false,
          borderColor: names[prop.name].color,
          tension: 0.1,
        },
      ];
      let ndata = {
        datasets: newdatasets,
      };
      setGraphData(ndata);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [prop.name]);

  const options = {
    parsing: {
      xAxisKey: "time",
      yAxisKey: "value",
    },
    radius: 0,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        // min: '2023-05-20 18:30:00',
        // max: '2023-05-20 18:42:00',
        parsing: false,
        type: "time" as const,
        time: {
          unit: "minute" as const,
        },
        title: {
          display: true,
          text: "time",
        },
        // Include a dollar sign in the ticks
        color: "#ffffff",
        font: {
          size: 14,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };
  return <Line data={graphData} options={options} />;
}
