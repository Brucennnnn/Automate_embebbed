import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import light from "../public/light.svg";
import Image from "next/image";
import axios from "axios";
import { af } from "date-fns/locale";
interface Props {
  onClick: () => void | undefined;
}
export default function Light(props: Props) {
  const { onClick} = props;
  const [data, setData] = useState(0);
  const [color, setColor] = useState(styles.low);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://144.24.138.249:5000/now`
      );
      // Handle the response data here  
      setData(response.data.light);
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
    setColor(styles.bright);
  }, [data]);

  return (
    <div onClick={onClick} className={`${styles.smallcard} ${color}`}>
      <div className={styles.smallname}>
        <Image src={light} alt="Picture of the author" width={50} height={50} />
      </div>
      <div className={styles.smallbottom}>
        <div className={styles.bl}>
          <div className={styles.smalldata}>{data}%</div>
          <div className={styles.smallname}>Brightness</div>
        </div>

        <div className={styles.smallunit}></div>
      </div>
    </div>
  );
}
