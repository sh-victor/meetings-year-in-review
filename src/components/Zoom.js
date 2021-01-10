import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from '@reactchartjs/react-chart.js';

import './slides-common.css';

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
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="cy-slide-container">
        <h1>Did you jump on the Zoom bandwagon?</h1>
        <div>
          <label>Total in-person meetings participated:</label>
          <span>{zoom.in_person}</span>
        </div>
        <div>
          <label>Total zoom meetings participated:</label>
          <span>{zoom.ZOOM}</span>
        </div>
        <div className="cy-slide-chart">
          <Doughnut data={data} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Zoom);
