import React from 'react';
import jsonify from '../utils/ical-jsonify';
import mockCalendarData from '../__mock__/jenniferli0823_ics';
import * as calendarUtils from '../utils/ics-summarize';

export default class CalendarFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calendarText: '', data: mockCalendarData };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    e.preventDefault();
    this.setState({
      data: jsonify(this.state.calendarText),
      // data2: jsonConvert(this.state.calendarText),
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      calendarText: e.target.value,
    });
  }

  render() {
    const { data } = this.state;
    const jsonText = JSON.stringify(data, null, 2) || '';
    console.log(data);

    const howManyMeetings = calendarUtils.howManyMeetings(data);
    const averageMeetingLength = calendarUtils.averageMeetingLength(data);
    const numOfWeeksPerMonth = calendarUtils.numOfMeetingsPerMonth(data);
    const numOfWeeksPerWeek = calendarUtils.numOfMeetingsPerWeek(data);
    const bdZoom = calendarUtils.bdZoom(data);
    const bdMinutes = calendarUtils.bdMinutes(data);
    const numOfMeetingsPerDayOfWeek = calendarUtils.numOfMeetingsPerDayOfWeek(
      data
    );
    const titleRank = calendarUtils.titleRank(data);

    return (
      <div>
        <textarea
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        ></textarea>
        <div>
          <label>How many meetings a year</label>
          <span>{howManyMeetings}</span>
        </div>
        <div>
          <label>Average meeting length</label>
          <span>{averageMeetingLength}</span>
        </div>
        <div>
          <label># of meetings per month</label>
          <span>{JSON.stringify(numOfWeeksPerMonth)}</span>
        </div>
        <div>
          <label># of meetings per week</label>
          <span>{JSON.stringify(numOfWeeksPerWeek)}</span>
        </div>
        <div>
          <label>Break down - In person vs On Zoom</label>
          <span>{JSON.stringify(bdZoom)}</span>
        </div>
        <div>
          <label>Break down - length</label>
          <span>{JSON.stringify(bdMinutes)}</span>
        </div>
        <div>
          <label># of meetings per day of week</label>
          <span>{JSON.stringify(numOfMeetingsPerDayOfWeek)}</span>
        </div>
        <div>
          <label>Frequency rank by title occurrence</label>
          <span>{JSON.stringify(titleRank)}</span>
        </div>
        {/* {jsonText.split('\n').map((i, key) => {
          return <div key={key}>{i}</div>;
        })} */}
      </div>
    );
  }
}
