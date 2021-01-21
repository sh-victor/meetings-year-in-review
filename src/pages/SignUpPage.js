import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { post } from 'axios';
import {
  ACTION_CALENDAR_SUMMARY_FAILED,
  ACTION_CALENDAR_SUMMARY_FULFILLED,
  ACTION_CALENDAR_SUMMARY_STARTED,
} from '../reducers/index';

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
      <FullPage>
        <Title>More Things Than Ever Before Had Happened in 2020</Title>
        <Subtitle>
          Despite everything, you met with families, friends, and made new
          people via online meetings. Here are a few highlights from a year to
          remember (or you know, <em>forget</em>).
        </Subtitle>

        <form onSubmit={this.onFormSubmit}>
          <ImportCalender htmlFor="ics-upload-input" id="ics-upload-label">
            Import Calendar
          </ImportCalender>

          <HiddenInput
            id="ics-upload-input"
            type="file"
            onChange={this.onSelect}
          />
        </form>
      </FullPage>
    );
  }
}

export default connect()(SignUp);

const FullPage = styled.div`
  height: 100%;
  background: rgb(7, 9, 11);
  background: radial-gradient(
    circle,
    rgba(7, 9, 11, 1) 75%,
    rgba(54, 31, 28, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 30%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  color: #fff;
`;

const Subtitle = styled.h2`
  color: #a793b1;
`;

const ImportCalender = styled.label`
  border: 3px solid #111;
  background-color: #fff;
  display: inline-block;
  padding: 0.5em 1em;
  cursor: pointer;
  min-width: 80px;
  margin-top: 1em;
  font-weight: 900;
  font-size: 2rem;
  border-radius: 10px;
  /*https://codepen.io/StrengthandFreedom/pen/PoqZRgM*/
  animation-name: backgroundColorPalette;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  /* linear is enabled default, it’s not necessary to add it make it work but it can make your code more expressive */
  transition: all 0.5s ease-out;

  &:hover {
    color: white;
  }

  @keyframes backgroundColorPalette {
    0% {
      background: #ee6055;
    }
    25% {
      background: #60d394;
    }
    50% {
      background: #aaf683;
    }
    75% {
      background: #ffd97d;
    }
    100% {
      background: #ff9b85;
    }
  }

  @media only screen and (max-width: 600px) {
    .sign-up #ics-upload-label,
    .sign-up #ics-upload-submit {
      padding: 0.75em 0.75em;
      font-size: 1.25rem;
    }
  }
`;
