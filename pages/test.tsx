import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import smoke from "../public/smokeicon.svg";
import Image from "next/image";
const Test: NextPage = () => {
  const [data, setData] = useState(0);
  const [color, setColor] = useState(styles.low);
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevCount) => 200);
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (data > 200) {
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
    <div className={`${styles.card} ${color}`}>
      <div className={styles.name}>
        <Image src={smoke} alt="Picture of the author" width={50} height={50} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.data}>{data}</div>

        <div className={styles.unit}>ug/m3</div>
      </div>
    </div>
  );
};

export default Test;
