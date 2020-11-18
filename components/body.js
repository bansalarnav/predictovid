import Search from "./body/search";
import styles from "./body.scss";
import LineChart from "./line-chart";
import axios from "axios";
import { useState, useEffect } from "react";

const Body = () => {
  const [chartData, setChartData] = useState([]);
  const [location, setLocation] = useState("India");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.covid19india.org/data.json").then((res) => {
      console.log(res.data.cases_time_series);
        setChartData(res.data.cases_time_series);
        setLoading(false);
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
    setLocation(newLoca);
  }
  if (loading) {
    return <div></div>;
  } else {
    return (
      <div className={styles.body}>
        <Search onSubmit={onSubmit} />
        <h1 className={styles.body__location}>{location}</h1>
        <div className={styles.body__section}>
          <h5>Current</h5>
          <div className={styles.body__container}>
            <div className={styles.body__stats}>
              <StatCard
                label="Confirmed"
                value={
                  chartData.length > 0
                    ? chartData[chartData.length - 1].totalconfirmed
                    : ""
                }
              />
              <StatCard
                label="Active"
                value={
                  chartData.length > 0
                    ? chartData[chartData.length - 1].totalconfirmed -
                      chartData[chartData.length - 1].totalrecovered -
                      chartData[chartData.length - 1].totaldeceased
                    : ""
                }
              />
              <StatCard
                label="Recovered"
                value={
                  chartData.length > 0
                    ? chartData[chartData.length - 1].totalrecovered
                    : ""
                }
              />
              <StatCard
                label="Deceased"
                value={
                  chartData.length > 0
                    ? chartData[chartData.length - 1].totaldeceased
                    : ""
                }
              />
            </div>
            <div className={styles.body__container_charts}>
              <div className={styles.col}>
                <LineChart
                  color="#0779e4"
                  className={styles.body__stats__chart_container}
                  data={chartData.map((data) => {
                    return { time: data.dateymd, value: data.totalconfirmed };
                  })}
                  title="Confirmed"
                />
              </div>
              <div className={styles.col}>
                <LineChart
                  color="#55e82b"
                  className={styles.body__stats__chart_container}
                  data={chartData.map((data) => {
                    return { time: data.dateymd, value: data.totalrecovered };
                  })}
                  title="Recovered"
                />
              </div>
              <LineChart
                color="#adb5bd"
                className={styles.body__stats__chart_container}
                data={chartData.map((data) => {
                  return { time: data.dateymd, value: data.totaldeceased };
                })}
                title="Deceased"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Body;
