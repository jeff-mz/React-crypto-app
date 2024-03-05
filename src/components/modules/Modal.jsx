import { useState } from "react";
import { converter } from "../../helpers/dataConverter";
import styles from "./Modal.module.css";
import { FaWindowClose } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Modal({ setChart, chart }) {
  const [type, setType] = useState("prices");
  return (
    <div className={styles.modal}>
      <FaWindowClose
        style={{ width: "40px", height: "40px" }}
        onClick={() => setChart(null)}
      />
      <div className={styles.graph}>
        <div className={styles.info}>
          <img className={styles.info_img} src={chart.coin.image} alt="coin" />
          <p className={styles.info_name}>{chart.coin.name}</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={converter(chart, type)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#404042" />
            <XAxis dataKey="date" hide domain={["auto", "auto"]} />
            <YAxis dataKey={type} domain={["auto", "auto"]} />
            <Line type="monotone" dataKey={type} stroke="#3874ff" />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>

        <div className={styles.types}>
          <button className={styles.type_btn} onClick={() => setType("prices")}>
            Price
          </button>
          <button
            className={styles.type_btn}
            onClick={() => setType("market_caps")}
          >
            Market caps
          </button>
          <button
            className={styles.type_btn}
            onClick={() => setType("total_volumes")}
          >
            Total volume
          </button>
        </div>
        <div className={styles.details}>
          <p className={styles.price}>
            Price:{" "}
            <span style={{ color: "#333", fontSize: "15px" }}>
              ${chart.coin.current_price}
            </span>
          </p>
          <p className={styles.ath}>
            ATH:{" "}
            <span style={{ color: "#333", fontSize: "15px" }}>
              ${chart.coin.ath}
            </span>
          </p>
          <p className={styles.market}>
            Market cap:{" "}
            <span style={{ color: "#333", fontSize: "15px" }}>
              {chart.coin.market_cap}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
