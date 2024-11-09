import { useState, useEffect } from "react";
import { getCoinList } from "../../services/cryptoApi.js";
import CoinsTable from "../modules/CoinsTable";
import classes from "./Homepage.module.css";
import Pagination from "../modules/Pagination.jsx";
import CurrencyChanger from "../modules/CurrencyChanger.jsx";
import Search from "../modules/Search.jsx";
import Modal from "../modules/Modal.jsx";
import GridLoader from "react-spinners/GridLoader";

function Homepage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let res = await fetch(getCoinList(page, currency));
      let json = await res.json();
      setCoins(json);
      setLoading(false);
    };
    getData();
  }, [page, currency]);

  return (
    <>
      {loading ? (
        <div style={{ margin: "auto", width: "100px" }}>
          <GridLoader color="#DDE6ED" />
        </div>
      ) : (
        <div className={classes.container}>
          <h1 className={classes.title}>MY Crypto App</h1>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Search />
            <CurrencyChanger currency={currency} setCurrency={setCurrency} />
          </div>
          <CoinsTable
            coins={coins}
            loading={loading}
            currency={currency}
            setChart={setChart}
          />
          <Pagination page={page} setPage={setPage} />
          {!!chart && <Modal setChart={setChart} chart={chart} />}
          <p className={classes.attribution}>
            Made by
            <a
              href="https://github.com/jeff-mz"
              target="_blank"
              rel="noreferrer"
            >
              Jafar Mirzapoor
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default Homepage;
