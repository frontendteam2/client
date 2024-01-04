import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useMaxWidth } from "../../util/useMaxWidth";

export default function Slide(){
  const width = useMaxWidth();

  return(
    <div>
      <Swiper 
        navigation={true} 
        modules={[Navigation]} 
        spaceBetween={15}
        slidesPerView={5}
        slidesPerGroup={3}
      >
        <SwiperSlide >
          <img src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}