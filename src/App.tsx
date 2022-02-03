import React, {useEffect, useState} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

import './App.css';
import 'react-calendar-heatmap/dist/styles.css';

function App() {

  const [data, setData] = useState([])
  const [state, setState] = useState("")

  const getData = () => {
    fetch("./Data/transactions-carter.json", {
      headers:{
        "Content-Type": "application.json",
        Accept: "application.json",
      },
    })
        .then(function (res){
          // console.log(res);
          return res.json();
        })
        .then(function (myJson){
          setData(myJson);
          setState("a");
        });
  };

  useEffect(() => {
    getData();

      const groups = data.reduce((groups, game) => {
          // @ts-ignore
          const date = game.date.split('-')[1];
          // @ts-ignore
          if (!groups[date]) {
              // @ts-ignore
              groups[date] = [];
          }
          // @ts-ignore
          groups[date].push(game);
          return groups;
      }, {});

      const groupArrays = Object.keys(groups).map((date) => {
          // @ts-ignore
          return {
              date,
              // games: groups[date]
          };
      });

      console.log(groupArrays);
      // console.log(groups)
  }, []);

  return (
    <div className="App">
        <CalendarHeatmap
            values={data}
            classForValue={(value: { amount: any; }) => {
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
