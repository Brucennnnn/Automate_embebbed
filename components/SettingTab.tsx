import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, useMantineTheme, rem } from "@mantine/core";
import Slider from "./Slider";
import setting from "../public/setting.svg";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "date-fns";

export default function SettingTab() {
  const [opened, { open, close }] = useDisclosure(false);
  const [temp, setTemp] = useState([30, 40]);
  const [pm, setPm] = useState([100, 150]);
  const [humid, setHumid] = useState([25, 75]);
  const [light, setLight] = useState([25, 75]);
  // const theme = useMantineTheme();
  const fetchData = async () => {
    console.log("fetch");
    let pdata = {
      dust: {
        min: pm[0],
        max: pm[1],
      },
      light: {
        min: light[0],
        max: light[1],
      },
      humid: {
        min: humid[0],
        max: humid[1],
      },
      temp: {
        min: temp[0],
        max: temp[1],
      },
    };
    try {
      const response = await axios.post(
        `http://144.24.138.249:5000/setting`,
        pdata
      );
      console.log(response.data);
      // Handle the response data here
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  async function setStart() {
    try {
      const response = await axios.get(`http://144.24.138.249:5000/setting`);

      setTemp([response.data.temp.min, response.data.temp.max]);
      setPm([response.data.dust.min, response.data.dust.max]);
      setHumid([response.data.humid.min, response.data.humid.max]);
      setLight([response.data.light.min, response.data.light.max]);
      // Handle the response data here
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  }
  useEffect(() => {
    setStart();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Setting"
        size={500}
        padding={40}
        // overlayProps={{
        //   color:
        //     theme.colorScheme === "dark"
        //       ? theme.colors.dark[9]
        //       : theme.colors.dark[2],
        //   opacity: 0.55,
        //   blur: 3,
        // }}
        styles={(theme) => ({
          title: {
            fontSize: rem(25),
          },
          header: {
            color: "#fff",
            backgroundColor: "#2c2c2c",
          },
          content: {
            backgroundColor: "#2c2c2c",
          },
          body: {
            backgroundColor: " #2c2c2c",
          },
        })}
      >
        <div>
          <Slider
            name="PM2.5 (ppm)"
            min={0}
            max={300}
            def={[100, 150]}
            barColor={"#a144f2"}
            value={pm}
            onChange={setPm}
          />
        </div>
        <div>
          <Slider
            name="Temperature (°C)"
            min={0}
            max={60}
            def={[30, 40]}
            barColor={"#FF6E40"}
            value={temp}
            onChange={setTemp}
          />
        </div>
        <div>
          <Slider
            name="Humidity (%)"
            min={0}
            max={100}
            def={[25, 75]}
            barColor={"#7ba0ff"}
            value={humid}
            onChange={setHumid}
          />
        </div>
        <div>
          <Slider
            name="Light (%)"
            min={0}
            max={100}
            def={[25, 75]}
            barColor={"#FFCF53"}
            value={light}
            onChange={setLight}
          />
        </div>
        <div className={styles.butt}>
          <Button
            color="red"
            radius="md"
            onClick={() => {
              fetchData();
              close();
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Image
        className={styles.setting}
        onClick={open}
        src={setting}
        alt="Picture of the author"
        width={30}
        height={30}
      />
    </>
  );
}
