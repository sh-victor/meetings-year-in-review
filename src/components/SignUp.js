import React from 'react';
import { connect } from 'react-redux';

import './slides-common.css';
import axios, { post } from 'axios';
import {
  ACTION_CALENDAR_SUMMARY_FAILED,
  ACTION_CALENDAR_SUMMARY_FULFILLED,
  ACTION_CALENDAR_SUMMARY_STARTED,
} from '../reducers/index';

// const mapStateToProps = (state) => {
//   return {
//     status: state.calendarData.status,
//   };
// };

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   file: null,
    // };
    // this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    e.preventDefault();
    // this.setState({ file: e.target.files[0] });
    this.doUpload(e.target.files[0]);
  }

  // onSubmit(e) {
  //   e.preventDefault();
  // }

  doUpload(file) {
    const url = 'http://localhost:3000/upload';
    const formData = new FormData();
    formData.append('calendar', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.props.dispatch({
      type: ACTION_CALENDAR_SUMMARY_STARTED,
    });

    return post(url, formData, config).then(
      (response) => {
        console.log(response.data);
        this.props.dispatch({
          type: ACTION_CALENDAR_SUMMARY_FULFILLED,
          payload: response.data,
        });
      },
      (error) => {
        this.props.dispatch({
          type: ACTION_CALENDAR_SUMMARY_FAILED,
          payload: error,
        });
      }
    );
  }

  render() {
    return (
      <div className="cy-slide-container sign-up">
        <h1>A lot happened in 2020</h1>
        <h2>
          Despite everything, you met with families, friends, and made new
          people via online meetings. Here are a few highlights from a year to
          remember (or you know, forget).
        </h2>

        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="ics-upload-input" id="ics-upload-label">
            Import Calendar
          </label>

          <input id="ics-upload-input" type="file" onChange={this.onSelect} />
          {/* <label id="ics-upload-submit" onClick={this.onSubmit}>
            Upload
          </label> */}
        </form>
      </div>
    );
  }
}

export default connect()(SignUp);
