import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as moment from 'moment';
import { Bar } from '@reactchartjs/react-chart.js';

import './slides-common.css';
import './MeetingInEachMonth.css';

const getBestMonth = (monthObj) => {
  if (!monthObj) return null;
  var best = [];
  for (const [key, value] of Object.entries(monthObj)) {
    if (best.length == 0 || value > best[0].value) {
      best = [{ key, value }];
    } else if (value == best[0].value) {
      best.push({ key, value });
    }
  }
  return best;
};

const mapStateToProps = (state) => {
  return {
    monthData: state.calendarData.data.month,
    bestMonth: getBestMonth(state.calendarData.data.month),
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

class MeetingInEachMonth extends React.Component {
  render() {
    // months is 0-11
    const { monthData, bestMonth } = this.props;

    const monthFullNames = moment.months(),
      monthShortNames = moment.monthsShort();

    const monthDataArr = new Array(12).fill(0);
    if (monthData) {
      for (const [k, v] of Object.entries(monthData)) {
        monthDataArr[k] = v;
      }
    }

    const backgroundColors = new Array(12).fill('rgba(3, 3, 3, 0.2)');
    const borderColors = new Array(12).fill('rgba(3, 3, 3, 0.2)');
    if (bestMonth && bestMonth.length) {
      bestMonth.forEach((v, k) => {
        backgroundColors[v.key] = 'rgba(255, 99, 132, 0.2)';
        borderColors[v.key] = 'rgba(255, 99, 132, 1)';
      });
    }

    console.log(bestMonth);
    console.log(backgroundColors);
    const data = {
      labels: monthShortNames,
      datasets: [
        {
          label: 'Number of Meetings',
          data: monthDataArr,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="cy-slide-container meetings-in-each-month">
        <div className="content">
          <h1>How many meetings did you have each month?</h1>
          {bestMonth && bestMonth.length == 1 && (
            <div>
              <h2 className="subtitle">
                Your busiest month is{' '}
                <span className="best-month">
                  {monthFullNames[bestMonth[0].key]}
                </span>
              </h2>
              <h2 className="subtitle">
                You have{' '}
                <span className="best-month">{bestMonth[0].value}</span> meeting
                in
              </h2>
            </div>
          )}

          {bestMonth && bestMonth.length > 1 && (
            <div>
              <h2 className="subtitle">
                Your busiest months are{' '}
                <span className="best-month">
                  {bestMonth.map((m) => monthFullNames[m.key]).join(', ')}
                </span>
              </h2>
              <h2 className="subtitle">
                You have{' '}
                <span className="best-month">{bestMonth[0].value}</span> meeting
                in those months
              </h2>
            </div>
          )}
          <div className="cy-slide-chart">
            <Bar data={data} options={options} />
          </div>
        </div>{' '}
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MeetingInEachMonth);
