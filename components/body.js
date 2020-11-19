import Search from "./body/search";
import styles from "./body.scss";
import LineChart from "./line-chart";
import axios from "axios";
import { useState, useEffect } from "react";
import stateCodes from "../data/states.json";
import stateNames from "../data/stateNames.json";
import Loader from "./loader";
import Prediction from "./body/prediction";

const Body = () => {
  const [chartData, setChartData] = useState([]);
  const [location, setLocation] = useState("India");
  const [loading, setLoading] = useState(true);
  const [foundResult, setFoundResult] = useState(true);
  const [searching, setSearching] = useState(false);
  const [statesData, setStatesData] = useState({});
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deceased, setDeceased] = useState(0);
  const [totalGraph, setTotalGraph] = useState([]);
  const [recovGraph, setRecovGraph] = useState([]);
  const [deceaGraph, setDeceaGraph] = useState([]);
  const [stateChartData, setStateChartData] = useState([]);

  useEffect(() => {
    axios.get("https://api.covid19india.org/data.json").then((res) => {
      console.log(res.data.cases_time_series);
      setChartData(res.data.cases_time_series);
      var print;
      res.data.cases_time_series.forEach((value) => {
        print == null
          ? (print = value.totalconfirmed)
          : (print = print + `, ${value.totalconfirmed}`);
      });
      console.log(print);
      setTotal(
        res.data.cases_time_series[res.data.cases_time_series.length - 1]
          .totalconfirmed
      );
      setActive(
        res.data.cases_time_series[res.data.cases_time_series.length - 1]
          .totalconfirmed -
          res.data.cases_time_series[res.data.cases_time_series.length - 1]
            .totalrecovered -
          res.data.cases_time_series[res.data.cases_time_series.length - 1]
            .totaldeceased
      );
      setRecovered(
        res.data.cases_time_series[res.data.cases_time_series.length - 1]
          .totalrecovered
      );
      setDeceased(
        res.data.cases_time_series[res.data.cases_time_series.length - 1]
          .totaldeceased
      );
      axios.get("https://api.covid19india.org/v4/data.json").then((res2) => {
        setStatesData(res2.data);
        setTotalGraph(
          res.data.cases_time_series.map((data) => {
            return {
              time: data.dateymd,
              value: data.totalconfirmed,
            };
          })
        );
        setRecovGraph(
          res.data.cases_time_series.map((data) => {
            return {
              time: data.dateymd,
              value: data.totalrecovered,
            };
          })
        );
        setDeceaGraph(
          res.data.cases_time_series.map((data) => {
            return { time: data.dateymd, value: data.totaldeceased };
          })
        );
        axios
          .get("https://api.covid19india.org/v4/timeseries.json")
          .then((res3) => {
            setStateChartData(res3.data);
            setLoading(false);
          });
      });
    });
  }, []);

  const StatCard = ({ label, value }) => {
    return (
      <div className={styles.body__stats_card}>
        <h2>{value}</h2>
        <h3>{label}</h3>
      </div>
    );
  };

  function onSubmit(newLoca) {
    setSearching(true);
    newLoca = newLoca.toLowerCase().replace(/\s/g, "");
    const keys = Object.keys(stateCodes);

    if (!keys.includes(newLoca)) {
      setSearching(false);
      setFoundResult(false);
    } else {
      var stateCode = stateCodes[newLoca];
      setLocation(stateNames[newLoca]);
      if (newLoca != "india") {
        setTotal(statesData[stateCode].total.confirmed);
        setRecovered(statesData[stateCode].total.recovered);
        setDeceased(statesData[stateCode].total.deceased);
        setActive(
          statesData[stateCode].total.confirmed -
            statesData[stateCode].total.deceased -
            statesData[stateCode].total.recovered
        );

        var recovered = [];
        var total = [];
        var deceased = [];

        const dateKeys = Object.keys(stateChartData[stateCode].dates);
        const data = stateChartData[stateCode].dates;
        dateKeys.forEach((value, index) => {
          data[value].total.confirmed
            ? total.push({ time: value, value: data[value].total.confirmed })
            : null;
          data[value].total.recovered
            ? recovered.push({
                time: value,
                value: data[value].total.recovered,
              })
            : null;
          data[value].total.deceased
            ? deceased.push({ time: value, value: data[value].total.deceased })
            : null;
        });
        setTotalGraph(total);
        setRecovGraph(recovered);
        setDeceaGraph(deceased);
      } else {
        setTotal(chartData[chartData.length - 1].totalconfirmed);
        setActive(
          chartData[chartData.length - 1].totalconfirmed -
            chartData[chartData.length - 1].totalrecovered -
            chartData[chartData.length - 1].totaldeceased
        );
        setRecovered(chartData[chartData.length - 1].totalrecovered);
        setDeceased(chartData[chartData.length - 1].totaldeceased);
        setTotalGraph(
          chartData.map((data) => {
            return {
              time: data.dateymd,
              value: data.totalconfirmed,
            };
          })
        );
        setRecovGraph(
          chartData.map((data) => {
            return {
              time: data.dateymd,
              value: data.totalrecovered,
            };
          })
        );
        setDeceaGraph(
          chartData.map((data) => {
            return { time: data.dateymd, value: data.totaldeceased };
          })
        );
      }
      setSearching(false);
      setFoundResult(true);
    }
  }
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "65px",
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className={styles.body}>
        <Search onSubmit={onSubmit} />
        {searching ? (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "65px",
            }}
          >
            <Loader />
          </div>
        ) : !foundResult ? (
          <div className={styles.sorry}>
            <h1>Sorry! We couldnt find that place</h1>
            <h5>Try fixing any spelling errors and try again</h5>
          </div>
        ) : (
          <div>
            <h1 className={styles.body__location}>{location}</h1>
            <div className={styles.body__section}>
              <h5>Current</h5>
              <div className={styles.body__container}>
                <div className={styles.body__stats}>
                  <StatCard label="Confirmed" value={total} />
                  <StatCard label="Active" value={active} />
                  <StatCard label="Recovered" value={recovered} />
                  <StatCard label="Deceased" value={deceased} />
                </div>
                <div className={styles.body__container_charts}>
                  <div className={styles.col}>
                    <LineChart
                      color="#0779e4"
                      className={styles.body__stats__chart_container}
                      data={totalGraph}
                      title="Confirmed"
                    />
                  </div>
                  <div className={styles.col}>
                    <LineChart
                      color="#55e82b"
                      className={styles.body__stats__chart_container}
                      data={recovGraph}
                      title="Recovered"
                    />
                  </div>
                  <LineChart
                    color="#adb5bd"
                    className={styles.body__stats__chart_container}
                    data={deceaGraph}
                    title="Deceased"
                  />
                </div>
              </div>
            </div>
            <div style={{ height: "50px" }}></div>
            <div className={styles.body__section}>
                  <h5>{ `Prediction - ${location}`}</h5>
                  <Prediction location={ location}/>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Body;
