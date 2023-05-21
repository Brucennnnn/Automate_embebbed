import { useState } from "react";
import { RangeSlider } from "@mantine/core";
import styles from "../styles/Home.module.css";
import { th } from "date-fns/locale";

export default function Slider(props: any) {
  const { name, min, max, def, barColor, value, onChange } = props;

  return (
    <>
      <p className={styles.fontw}>{props.name}</p>
      <div className={styles.slider}>
        <RangeSlider
          defaultValue={props.def}
          minRange={1}
          min={props.min}
          max={props.max}
          labelAlwaysOn
          value={value}
          onChange={onChange}

          styles={(theme) => ({
            bar:{
              backgroundColor: `${barColor}`,
            },
            thumb:{
              backgroundColor: `${barColor}`,
              borderColor: `${barColor}`,
            }
          })}
        />
      </div>
    </>
  );
}
