import React from "react";
import Homepage from "./components/template/Homepage";
import classes from "./App.module.css";
function App() {
  return (
    <main className={classes.app}>
      <Homepage />
    </main>
  );
}

export default App;
