import React from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from '@reactchartjs/react-chart.js';

import './slides-common.css';

const mapStateToProps = (state) => {
  return {
    dailyAvgLen: state.calendarData.data.dailyAvgLen,
    avgLen: state.calendarData.data.avgLen,
    dbLen: state.calendarData.data.len,
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

const MEETING_LEN_CATEGORY_0_30 = '0_30';
const MEETING_LEN_CATEGORY_30_60 = '30-60';
const MEETING_LEN_CATEGORY_60 = '60+';

class AverageMeetingLength extends React.Component {
  render() {
    const { dbLen = {}, avgLen = 0, dailyAvgLen = 0 } = this.props;

    const lenArr = [
      dbLen[MEETING_LEN_CATEGORY_0_30],
      dbLen[MEETING_LEN_CATEGORY_30_60],
      dbLen[MEETING_LEN_CATEGORY_60],
    ];

    const data = {
      labels: ['< 30 mins', '30 - 60 mins', '60 mins +'],
      redraw: true,
      datasets: [
        {
          label: 'Number of Meetings',

          data: lenArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="cy-slide-container">
        <h1>How long did you spend on meetings each day?</h1>
        <p>
          On average, you spent <span>{dailyAvgLen}</span> hours on meetings
          each day.
        </p>
        <p>
          On aveage, your meetings take
          <span> {avgLen.toFixed(0)} </span>
          mins each.
        </p>
        <div className="cy-slide-chart">
          <HorizontalBar data={data} options={options} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AverageMeetingLength);
