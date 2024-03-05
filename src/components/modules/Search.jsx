import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";

function Search() {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const changeHandler = (event) => setText(event.target.value);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (text === "") return;

    const getSearch = async () => {
      try {
        let searchRes = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        let searchJson = await searchRes.json();
        if (searchJson.coins) setCoins(searchJson.coins);
      } catch {
        (error) => {
          if (error.name !== "AbortError") alert(error.message);
        };
      }
    };
    getSearch();

    // cancel fetch to complete search text
    return () => controller.abort();
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        value={text}
        onChange={changeHandler}
        type="text"
        placeholder="Search for crypto"
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "#DDE6ED",
          color: "#526D82",
          padding: ".5rem 1rem",
          fontSize: "18px",
          borderRadius: "5px 5px 0px 0px ",
        }}
      />
      <div>
        <ul
          style={{
            backgroundColor: "#526D82",
            zIndex: 10,
            padding: "0px 10px",
          }}
        >
          {coins.map((coin) => {
            return (
              <li
                style={{
                  height: "30px",
                  display: "flex",
                  marginBottom: "5px",
                }}
              >
                <img src={coin.thumb} alt="coin img" />
                <span style={{ margin: "10px", color: "#333" }}>
                  {coin.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Search;
