import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import temp from "../public/temperatureicon.svg";
import Image from "next/image";
import axios from "axios";
interface Props {
  onClick: () => void | undefined;
}
export default function Temperature(props: Props) {
  const { onClick } = props;
  const [data, setData] = useState(0);
  const [color, setColor] = useState(styles.low);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://144.24.138.249:5000/now`);
      // Handle the response data here
      setData(response.data.temp);
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
  }, []);

  useEffect(() => {
    if (data > 35) {
      console.log("high");
      setColor(styles.hot);
    } else {
      setColor(styles.cold);
    }
  }, [data]);

  return (
    <div onClick={onClick} className={`${styles.card} ${color}`}>
      <div className={styles.name}>
        <Image src={temp} alt="Picture of the author" width={70} height={70} />
      </div>
      <div className={`${styles.bottom} ${styles.forp}`}>
        <div className={styles.bl}>
          <div className={styles.data}>
            {data}
            <span className={styles.unit}>°C</span>
          </div>
          <div className={styles.name}>Temperature</div>
        </div>
      </div>
    </div>
  );
}
