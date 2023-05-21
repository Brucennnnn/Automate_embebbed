import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SegmentedControl } from "@mantine/core";
import { CategoryScale } from "chart.js";
import LineChart from "../components/LineChart";
import Chart from "chart.js/auto";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Pm25 from "../components/Pm25";
import { NameType } from "../components/LineChart";
Chart.register(CategoryScale);

export default function ChartContainer() {
  const [value, setValue] = useState("PM 2.5");

  return (
    <>
      <div className={styles.nav}></div>
      <div>
        {/* <SegmentedControl 
        value={value}
        onChange={setValue}
        data={[
            { label: 'PM2.5', value: 'PM 2.5 Chart' },
            { label: 'Light', value: 'Light Chart' },
            { label: 'Temparature', value: 'Temperature Chart' },
        ]}
        /> */}

        <div className={styles.chartContainer}>
          <LineChart name={value as NameType } />
        </div>
      </div>
    </>
  );
}
