import classes from "./CurrencyChanger.module.css";
function CurrencyChanger({ currency, setCurrency }) {
  const currencyHandler = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <div className={classes.dropdown}>
      <select name="currency" id="currency" onChange={currencyHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">YEN</option>
      </select>
    </div>
  );
}

export default CurrencyChanger;
