import styles from "./prediction.scss";
import { useState, useEffect } from "react";

const Prediction = ({ location }) => {
  const StatCard = ({ label, value, newCases, show, style}) => {
    const [casesNew, setCasesNew] = useState(newCases);
    useEffect(() => {
      var decPlaces = Math.pow(10, 2);
      var abbrev = ["K", "M", "B", "T"];

      var value = casesNew;

      for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= value) {
          value = Math.round((value * decPlaces) / size) / decPlaces;

          if (value == 1000 && i < abbrev.length - 1) {
            value = 1;
            i++;
          }
          value += abbrev[i];
          break;
        }
      }
      setCasesNew(value);
    });
    return (
      <div className={styles.main__stats_card} style={style}>
        <h2>{value}</h2>
        <h4>{show && `+${casesNew}`}</h4>
        <h3>{label}</h3>
      </div>
    );
  };
  return (
    <div className={styles.main}>
      <h3>Main</h3>
      <div className={styles.main__categ}>
        <div className={styles.main__stats}>
          <StatCard
            label="Confirmed"
            value="total"
            show={true}
            newCases={102347}
          />
          <StatCard
            label="Recovered"
            value="recovered"
            show={true}
            newCases={3435}
          />
          <StatCard
            label="Deceased"
            value="decease"
            show={true}
                      newCases={203487}
                      style={{gridColumn: '2 / span 2'}}
          />
        </div>
        <div className={styles.main__para}>
          Through our predictions we find that-
          <ul>
            <li>Approx 3204803 cases will be reported in the next week</li>
            <li>Approx 7038472 will recover from covid in the next week</li>
            <li>
              Approx 93284 will sadly pass away from COVID-19 in the next week
            </li>
          </ul>
        </div>
      </div>
      <h3>Misc</h3>
      <div className={styles.main__categ}>
        <div className={styles.main__stats}>
          <StatCard label="Hospital Beds" value="total" newCases={102347} />
          <StatCard label="ICU Beds" value="recovered" newCases={3435} />
          <StatCard label="PPE Kits" value="recovered" newCases={3435} />
          <StatCard label="Ventilators" value="decease" newCases={203487} />
        </div>
        <div className={styles.main__para}>
          Through our predictions we find that-
          <ul>
            <li>
              Approx 1000 total hospital beds will be required in all of{" "}
              {location}
            </li>
            <li>
              Approx 500 total oxygen cylinders will be needed in all of{" "}
              {location}
            </li>
            <li>
              Approx 200 total Ventilators will be needed in all of {location}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
