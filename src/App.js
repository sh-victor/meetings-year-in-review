import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  A11y,
  EffectCoverflow,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import SignUp from './components/SignUp';
import TotalMeetings from './components/TotalMeetings';
import AverageMeetingLength from './components/AverageMeetingLength';
import Zoom from './components/Zoom';
import MeetingInEachMonth from './components/MeetingInEachMonth';
import { STATUS_READY } from './reducers';

import 'swiper/swiper-bundle.css';
import './App.css';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  EffectCoverflow,
  A11y,
]);

const mapStateToProps = (state) => {
  return {
    renderReport: state.calendarData.status === STATUS_READY,
  };
};

class App extends React.Component {
  render() {
    const renderReport = this.props.renderReport;
    console.log(renderReport);

    const swiperItems = true
      ? [
          <SwiperSlide key={0}>
            <SignUp></SignUp>
          </SwiperSlide>,
          <SwiperSlide key={1}>
            <TotalMeetings></TotalMeetings>
          </SwiperSlide>,
          <SwiperSlide key={2}>
            <AverageMeetingLength></AverageMeetingLength>
          </SwiperSlide>,
          <SwiperSlide key={3}>
            <MeetingInEachMonth></MeetingInEachMonth>
          </SwiperSlide>,
          <SwiperSlide key={4}>
            <Zoom></Zoom>
          </SwiperSlide>,
        ]
      : [
          <SwiperSlide key={0}>
            <SignUp></SignUp>
          </SwiperSlide>,
        ];

    return (
      <Swiper
        effect="fade"
        direction="vertical"
        mousewheel={true}
        spaceBetween={0}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {swiperItems}
      </Swiper>
    );
  }
}

export default connect(mapStateToProps)(App);
