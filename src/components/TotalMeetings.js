import React from 'react';
import { connect } from 'react-redux';

import './slides-common.css';

const mapStateToProps = (state) => {
  return {
    totalPartipated: state.calendarData.data.totalPartipated,
    totalHosted: state.calendarData.data.totalHosted,
    totalAttended: state.calendarData.data.totalAttended,
  };
};

class TotalMeetings extends React.Component {
  render() {
    return (
      <div className="cy-slide-container total-meetings">
        <h1>How many meetings did you have in 2020?</h1>
        <p>
          This year you were very busy. Let’s see how many meetings did you
          have:
        </p>
        <div>
          <label>Total meetings participate:</label>
          <span>{this.props.totalPartipated}</span>
        </div>
        <div>
          <label>Total meetings hosted:</label>
          <span>{this.props.totalHosted}</span>
        </div>
        <div>
          <label>Total meetings attended:</label>
          <span>{this.props.totalAttended}</span>
        </div>

        <p>Let's break it down further</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TotalMeetings);
