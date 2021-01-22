import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { post } from 'axios';
import {
  ACTION_CALENDAR_SUMMARY_FAILED,
  ACTION_CALENDAR_SUMMARY_FULFILLED,
  ACTION_CALENDAR_SUMMARY_STARTED,
} from '../reducers/index';
import {
  FullPageSlideContainer,
  Content,
  Header1,
  Header2,
} from '../components/SlideComponents';

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
        <Content>
          <Title className="text-center">
            More Things Than Ever Before Had Happened in 2020
          </Title>
          <Subtitle className="text-center">
            Despite everything, you met with families, friends, and made new
            people via online meetings. Here are a few highlights from a year to
            remember (or you know, <em>forget</em>).
          </Subtitle>

          <form
            onSubmit={this.onFormSubmit}
            className="text-center hidden md:block"
          >
            <ImportCalender
              id="ics-upload-label"
              htmlFor="ics-upload-input"
              className="text-2xl md:text-3xl lg:text-4xl 
              font-semibold px-6 p-4 lg:p-6 lg:px-8 mt-4 
              inline-block cursor-pointer rounded-lg"
            >
              Import Calendar
            </ImportCalender>

            <input
              id="ics-upload-input"
              className="hidden"
              type="file"
              onChange={this.onSelect}
            />
          </form>
        </Content>
      </FullPage>
    );
  }
}

export default connect()(SignUp);

const FullPage = styled(FullPageSlideContainer)`
  background: rgb(7, 9, 11);
  background: radial-gradient(
    circle,
    rgba(7, 9, 11, 1) 75%,
    rgba(54, 31, 28, 1) 100%
  );
`;

const Title = styled(Header1)`
  color: #fff;
`;

const Subtitle = styled(Header2)`
  color: #a793b1;
`;

const ImportCalender = styled.label`
  background-color: #fff;

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
`;
