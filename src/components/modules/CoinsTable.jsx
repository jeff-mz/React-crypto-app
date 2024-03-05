import React, { Children } from "react";
import chart_down from "../../assets/chart-down.svg";
import chart_up from "../../assets/chart-up.svg";
import classes from "./CoinsTable.module.css";
import GridLoader from "react-spinners/GridLoader";
import { marketChart } from "../../services/cryptoApi";

function CoinsTable({ coins, loading, currency, setChart }) {
  return loading ? (
    <div style={{ margin: "auto", width: "100px" }}>
      <GridLoader color="#DDE6ED" />
    </div>
  ) : (
    <table className={classes.table}>
      <thead className={classes.table_head}>
        <tr className={classes.table_head_row}>
          <th className={classes.table_head_element}>Symbol</th>
          <th className={classes.table_head_element}>Name</th>
          <th className={classes.table_head_element}>Price</th>
          <th className={classes.table_head_element}>Change</th>
          <th className={`${classes.table_head_element} ${classes.none}`}>
            Volume
          </th>
        </tr>
      </thead>
      <tbody className={classes.table_body}>
        {coins.map((coin) => {
          return (
            <TableRow
              coin={coin}
              key={coin.id}
              currency={currency}
              setChart={setChart}
            />
          ); // Coins component is defined at the end.
        })}
      </tbody>
    </table>
  );
}

export default CoinsTable;

// The coins are defined here as a separate component, It can in a separate file also .
const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_24h: price_change,
    total_volume,
  } = coin;
  const showChart = async () => {
    try {
      const coinData = await fetch(marketChart(id));
      console.log(marketChart(id));
      const res = await coinData.json();
      setChart({ ...res, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr className={classes.table_body_row}>
      <td className={classes.table_body_element}>
        <div
          style={{
            display: "flex ",
            alignItems: "center",
          }}
        >
          <img src={image} alt="coin image" className={classes.coin_img} />
          <span onClick={showChart} style={{ cursor: "pointer" }}>
            {symbol.toUpperCase()}
          </span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        <span style={{ marginRight: "3px" }}>
          {currency === "usd" && <span>$</span>}
        </span>
        <span style={{ marginRight: "3px" }}>
          {currency === "eur" && <span>€</span>}
        </span>
        <span style={{ marginRight: "3px" }}>
          {currency === "jpy" && <span>¥</span>}
        </span>
        {current_price.toLocaleString()}
      </td>
      <td style={{ color: price_change < 0 ? "#d336" : "#57bc7c" }}>
        {price_change.toFixed(2)}%
      </td>
      <td className={` ${classes.none}`}>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change < 0 ? chart_down : chart_up}
          alt="coin chart"
          className={`${classes.chart} ${classes.none}`}
        />
      </td>
    </tr>
  );
};
