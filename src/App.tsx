import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

import './App.css';
import 'react-calendar-heatmap/dist/styles.css';

function App() {

  const [data, setData] = useState([])
  const [transactions, setTransactions] = useState([])

  const getData = () => {
    fetch("./Data/transactions-carter.json", {
      headers: {
        "Content-Type": "application.json",
        Accept: "application.json",
      },
    })
      .then(function (res) {
        // console.log(res);
        return res.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();

    let finalObj: any = []
    data.forEach((transaction: any) => {
      const date = transaction.date
      if (finalObj[date]) {
        finalObj[date].push(transaction);
      } else {
        finalObj[date] = [transaction];
      }
    })
    // console.log(finalObj)

    setTransactions(finalObj)


  }, []);

  return (
    <div className="App">
      <CalendarHeatmap
        values={transactions}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.amount}`;
        }}
      />
    </div>
  );
}

export default App;
