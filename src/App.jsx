import React, { useEffect, useState } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';

import Calendar from 'react-github-contribution-calendar';

import './App.css';
// import 'react-calendar-heatmap/dist/styles.css';

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

    let finalObj = []
    data.forEach((transaction) => {
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

  var until = '2020-01-01';

  return (
    <div className="App">
     <Calendar values={transactions} until={until} />
    </div>
  );
}

export default App;
