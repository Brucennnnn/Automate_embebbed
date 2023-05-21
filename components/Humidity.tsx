import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import humid from "../public/humidity.svg";
import Image from "next/image";
import axios from "axios";
interface Props {
  onClick: () => void | undefined;
}
export default function Humidity(props: Props) {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://144.24.138.249:5000/now`
      );
      // Handle the response data here
      setData(response.data.humid);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };
  const { onClick} = props;
  const [data, setData] = useState(0);
  const [color, setColor] = useState(styles.low);
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
    setColor(styles.humid);
  }, [data]);

  return (
    <div onClick={onClick} className={`${styles.smallcard} ${color}`}>
      <div className={styles.smallname}>
        <Image src={humid} alt="Picture of the author" width={33} height={40} />
      </div>
      <div className={`${styles.smallbottom} ${styles.forph}`}>
        <div className={styles.bl}>
          <div className={styles.smalldata}>{data}%</div>
          <div className={styles.smallname}>Humidity</div>
        </div>

        <div className={styles.smallunit}></div>
      </div>
    </div>
  );
}
