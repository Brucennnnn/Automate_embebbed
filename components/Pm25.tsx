import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import smoke from "../public/smokeicon.svg";
import Image from "next/image";
import axios from "axios";
interface Props {
  onClick: () => void | undefined;

}
export default function Pm25(props: Props) {
  const { onClick} = props;
  const [data, setData] = useState(0);
  const [color, setColor] = useState(styles.low);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://144.24.138.249:5000/now`
      );
      // Handle the response data here
      setData(response.data.dust);

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
    if (data > 150) {
      console.log("high");
      setColor(styles.high);
    } else if (data > 100) {
      console.log("medium");

      setColor(styles.medium);
    } else {
      setColor(styles.low);
    }
  }, [data]);

  return (
    <div onClick={onClick} className={`${styles.card} ${color}`}>
      <div className={styles.name}>
        <Image src={smoke} alt="Picture of the author" width={55} height={55} />
      </div>
      <div className={styles.bottom}>
      <div className={styles.bl}>
        <div className={styles.data}>{data}<span className={styles.unit}>ppm</span></div>
        <div className={styles.name}>PM2.5</div>
        </div>

      </div>
    </div>
  );
}
