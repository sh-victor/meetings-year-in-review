import { Swiper, SwiperSlide } from 'swiper/react';
import SignUpPage from './SignUpPage';
export default () => {
  return (
    <Swiper
      direction="vertical"
      mousewheel={true}
      spaceBetween={50}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <SignUpPage></SignUpPage>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};
