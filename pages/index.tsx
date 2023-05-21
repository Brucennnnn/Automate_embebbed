import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SegmentedControl } from "@mantine/core";
import LineChart, { NameType } from "../components/LineChart";
import { useState } from "react";
import styles from "../styles/Home.module.css";

import setting from "../public/setting.svg";
import ChartContainer from "../components/ChartContainer";
import Pm25 from "../components/Pm25";
import Light from "../components/Light";
import Humidity from "../components/Humidity";
import Temp from "../components/Temperature";

import SettingTab from "../components/SettingTab";

const Home: NextPage = () => {
  const [value, setValue] = useState("PM 2.5");
  
  return (
    <div className={styles.fullpage}>
      <div className={styles.itempart}>
        <div className={styles.top}>
          <div className={styles.dashboard}>DashBoard</div>
          <div><SettingTab/></div>
        </div>
        <div className={styles.nav}>
          <div className={styles.leftside}>
            <Pm25 onClick={() => setValue("PM 2.5")}/>
            <Temp onClick={() => setValue("Temperature")}  />
          </div>
          <div className={styles.rightside}>
            <Light onClick={() => setValue("Light")}  />
            <Humidity onClick={() => setValue("Humid")}  />
          </div>
        </div>
        <div className={styles.graphpart}>
        
          <LineChart name={value as NameType} />
        </div>
      </div>
    </div>
  );
};

export default Home;
