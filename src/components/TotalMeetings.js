import React from 'react';
import { connect } from 'react-redux';

import './slides-common.css';
import './TotalMeetings.css';

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
        <div className="content">
          <h1 className="title">How many meetings did you have in 2020?</h1>
          <h2 className="subtitle">
            This year you were very busy, like everybody else. You Are Busy, But
            So Is Everyone Else: What To Say Without Being Annoying ... like you
            want to sound important or are too lazy to articulate a response
            Let’s see how many meetings did you have:
          </h2>
          <div className="groups">
            <div className="group">
              <label>Total Meetings Participate:</label>
              <span>{this.props.totalPartipated}</span>
            </div>
            {/* <div className="group">
              <label>
                Total Meetings Hosted: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <span>{this.props.totalHosted}</span>
            </div> */}
            <div className="group">
              <label>Total Meetings Attended:&nbsp;&nbsp;&nbsp;</label>
              <span>{this.props.totalAttended}</span>
            </div>
          </div>
          {/* <p>Let's break it down further</p> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TotalMeetings);
