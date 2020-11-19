import styles from "./prediction.scss";
import { useState, useEffect } from "react";

const Prediction = ({
  location,
  confirmedData,
  recoveredData,
  deceasedData,
}) => {
  const StatCard = ({ label, value, newCases, show, style }) => {
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
        <h4 style={show ? {} : { visibility: "hidden" }}>{`+${casesNew}`}</h4>
        <h3>{label}</h3>
      </div>
    );
  };
  const [totalPred, setTotalPred] = useState(0);
  const [recovPred, setRecovPred] = useState({ total: 0, new: 0 });
  const [decePred, setDecePred] = useState({ total: 0, new: 0 });
  const [activePred, setActivePred] = useState(0);
  useEffect(() => {
    var total15DaysData = confirmedData.slice(-7);
    var totalPercentChange = [];
    var percentChange =
      ((total15DaysData[total15DaysData.length - 1].value -
        total15DaysData[0].value) /
        total15DaysData[0].value) *
      100;

    const newCases = Math.round(
      (percentChange / 100) * total15DaysData[total15DaysData.length - 1].value
    );
    const totalCases =
      newCases + parseInt(total15DaysData[total15DaysData.length - 1].value);
    setTotalPred({ total: totalCases, new: newCases });

    var recov15DaysData = recoveredData.slice(-7);
    var percentRecov =
      ((recov15DaysData[recov15DaysData.length - 1].value -
        recov15DaysData[0].value) /
        recov15DaysData[0].value) *
      100;

    const newRecov = Math.round(
      (percentRecov / 100) * recov15DaysData[recov15DaysData.length - 1].value
    );
    const totalRecov =
      newRecov + parseInt(recov15DaysData[recov15DaysData.length - 1].value);
    setRecovPred({ total: totalRecov, new: newRecov });

    var ded15DaysData = deceasedData.slice(-7);
    var percentded =
      ((ded15DaysData[ded15DaysData.length - 1].value -
        ded15DaysData[0].value) /
        ded15DaysData[0].value) *
      100;

    console.log(percentded);

    const newDed = Math.round(
      (percentded / 100) * ded15DaysData[ded15DaysData.length - 1].value
    );
    const totalDed =
      newDed + parseInt(ded15DaysData[ded15DaysData.length - 1].value);
    setDecePred({ total: totalDed, new: newDed });
    setActivePred(totalCases - totalRecov - totalDed);
  }, [confirmedData, recoveredData, deceasedData]);
  return (
    <div className={styles.main}>
      <h3>Cases</h3>
      <div className={styles.main__categ}>
        <div className={styles.main__stats}>
          <StatCard
            label="Confirmed"
            value={totalPred.total}
            show={true}
            newCases={totalPred.new}
          />
          <StatCard label="Active" value={activePred} />
          <StatCard
            label="Recovered"
            value={recovPred.total}
            show={true}
            newCases={recovPred.new}
          />
          <StatCard
            label="Deceased"
            value={decePred.total}
            show={true}
            newCases={decePred.new}
          />
        </div>
        <div className={styles.main__para}>
          Through our predictions we find that-
          <ul>
            <li>
              Approx {normalize(totalPred.new)} new cases will be reported in
              the next week
            </li>
            <li>
              Approx {normalize(recovPred.new)} new people will recover from
              COVID-19 in the next week
            </li>
            <li>
              Approx {normalize(decePred.new)} people will sadly pass away from
              COVID-19 in the next week
            </li>
          </ul>
        </div>
      </div>
      <h3>Equipment</h3>
      <div className={styles.main__categ}>
        <div className={styles.main__stats}>
          <StatCard
            label="Hospital Beds"
            value={Math.round(activePred * 0.2)}
            newCases={102347}
          />
          <StatCard
            label="ICU Beds"
            value={Math.round(activePred * 0.2 * 0.2)}
            newCases={3435}
          />
          <StatCard
            label="Ventilators"
            style={{ gridColumn: "2 / span 2" }}
            value={Math.round(activePred * 0.2 * 0.22)}
            newCases={203487}
          />
        </div>
        <div className={styles.main__para}>
          Through our predictions we find that-
          <ul>
            <li>
              Approx {Math.round(activePred * 0.2)} hospital beds will be
              required in all of {location} in total
            </li>
            <li>
              Approx {Math.round(activePred * 0.2 * 0.2)} ICU beds will be
              required in all of {location} in total
            </li>
            <li>
              Approx {Math.round(activePred * 0.2 * 0.22)} Ventilators will be needed in all of {location} in total
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prediction;

function normalize(value) {
  var decPlaces = Math.pow(10, 2);
  var abbrev = ["K", "M", "B", "T"];

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
  return value;
}
