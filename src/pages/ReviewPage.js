import React from 'react';
import { connect } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import TotalMeetings from '../components/TotalMeetings';
import AverageMeetingLength from '../components/AverageMeetingLength';
import Zoom from '../components/Zoom';
import MeetingInEachMonth from '../components/MeetingInEachMonth';
import { STATUS_READY } from '../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    match: { params },
  } = ownProps;

  return {
    id: params.id,
    isReady: state.calendarData.status === STATUS_READY,
  };
};

class Review extends React.Component {
  componentDidMount() {
    const { id, isReady } = this.props;
    if (!isReady) {
      // fetch('https://api.example.com/items')
      //   .then((res) => res.json())
      //   .then(
      //     (result) => {},
      //     (error) => {}
      //   );
    }
  }

  render() {
    const { isReady } = this.props;

    // if (!isReady) {
    //   return <h1>Loading</h1>;
    // }

    const swiperItems = [
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

export default connect(mapStateToProps)(Review);
