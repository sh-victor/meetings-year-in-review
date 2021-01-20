import React from 'react';
import { connect } from 'react-redux';

import { post } from 'axios';
import {
  ACTION_CALENDAR_SUMMARY_FAILED,
  ACTION_CALENDAR_SUMMARY_FULFILLED,
  ACTION_CALENDAR_SUMMARY_STARTED,
} from '../reducers/index';

// import './slides-common.css';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    e.preventDefault();
    this.doUpload(e.target.files[0]);
  }

  doUpload(file) {
    const url =
      'https://us-west3-meetings-year-in-review.cloudfunctions.net/upload';
    const formData = new FormData();
    formData.append('calendar', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const { history, dispatch } = this.props;

    dispatch({
      type: ACTION_CALENDAR_SUMMARY_STARTED,
    });
    return post(url, formData, config).then(
      (response) => {
        const responseData = response.data;
        const { id } = responseData;
        console.log(responseData);
        dispatch({
          type: ACTION_CALENDAR_SUMMARY_FULFILLED,
          payload: responseData,
        });
        history.push(`/review/${id}`);
      },
      (error) => {
        dispatch({
          type: ACTION_CALENDAR_SUMMARY_FAILED,
          payload: error,
        });
        history.push('/error');
      }
    );
  }

  render() {
    return (
      <div className="sign-up">
        <div className="content">
          <h1 className="title">
            More Things Than Ever Before Had Happened in 2020
          </h1>
          <h2 className="subtitle">
            Despite everything, you met with families, friends, and made new
            people via online meetings. Here are a few highlights from a year to
            remember (or you know, <em>forget</em>).
          </h2>

          <form onSubmit={this.onFormSubmit}>
            <label htmlFor="ics-upload-input" id="ics-upload-label">
              Import Calendar
            </label>

            <input id="ics-upload-input" type="file" onChange={this.onSelect} />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(SignUp);
