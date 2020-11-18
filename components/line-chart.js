import { Chart } from "react-chartjs-2";
import React from "react";
import styles from "./body.scss";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.time);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
    console.log(this.myChart.data.datasets[0].data);
  }

  componentDidMount() {
    console.log(this.props.data.map((d) => d.value));
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      height: "100px",
      options: {
        legend: {
          labels: {
            fontColor: "#323F4B",
            //fontSize: '16'
          },
        },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "quarter",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                callback: function (value, index, values) {
                  var decPlaces = Math.pow(10, 0);

                  // Enumerate number abbreviations
                  var abbrev = ["K", "M", "B", "T"];

                  // Go through the array backwards, so we do the largest first
                  for (var i = abbrev.length - 1; i >= 0; i--) {
                    // Convert array index to "1000", "1000000", etc
                    var size = Math.pow(10, (i + 1) * 3);

                    // If the number is bigger or equal do the abbreviation
                    if (size <= value) {
                      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                      // This gives us nice rounding to a particular decimal place.
                      value =
                        Math.round((value * decPlaces) / size) / decPlaces;

                      // Handle special case where we round up to the next abbreviation
                      if (value == 1000 && i < abbrev.length - 1) {
                        value = 1;
                        i++;
                      }

                      // Add the letter for the abbreviation
                      value += abbrev[i];

                      // We are done... stop
                      break;
                    }
                  }
                  return value;
                },
              },
            },
          ],
        },
      },
      data: {
        labels: this.props.data.map((d) => d.time),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map((d) => d.value),
            fill: "#fff",
            backgroundColor: this.props.color,
            pointRadius: 1,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 3,
          },
        ],
      },
    });
  }

  render() {
    return <canvas className={styles.body__stats__chart} ref={this.chartRef} />;
  }
}

export default LineChart;
