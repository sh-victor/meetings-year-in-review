import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from '@reactchartjs/react-chart.js';

import './slides-common.css';
import './Zoom.css';

const mapStateToProps = (state) => {
  return {
    zoom: state.calendarData.data.zoom,
  };
};

class Zoom extends React.Component {
  render() {
    const { zoom = {} } = this.props;
    const zoomDataArr = [zoom.in_person, zoom.ZOOM];
    const data = {
      labels: ['In-Person', 'Zoom'],
      datasets: [
        {
          label: 'Number of Meetings',
          data: zoomDataArr,
          backgroundColor: ['#081d56', '#F56A44'],
          borderColor: ['#3B3E6E', '#F0543F'],
          borderWidth: 1,
        },
      ],
      options: {
        plugin: {
          legend: {
            position: 'bottom',
            labels: {
              fontColor: 'white',
            },
          },
        },
      },
    };

    const zoomPercent = (
      (zoom.ZOOM / (zoom.ZOOM + zoom.in_person)) *
      100
    ).toFixed(0);
    const inpersonPercent = (
      (zoom.in_person / (zoom.ZOOM + zoom.in_person)) *
      100
    ).toFixed(0);

    return (
      <div className="cy-slide-container zoom">
        <h1 className="title">Did you jump on the Zoom bandwagon?</h1>
        <div className="group zoom-group">
          <span className="num">{zoom.ZOOM}</span>
          <label>Zoom Meetings Participated</label>
          {/* <span>{`${zoomPercent}%`}</span> */}
        </div>
        <div className="group">
          <span className="num">{zoom.in_person}</span>
          <label>In-Person Meetings Participated</label>
          {/* <span>{`${inpersonPercent}%`}</span> */}
        </div>
        <div className="cy-slide-chart">
          <Doughnut data={data} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Zoom);
