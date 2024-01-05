import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMaxWidth } from "../../util/useMaxWidth";

export default function Slide(){
  const width = useMaxWidth();

  //사진 슬라이드
  let images = [
    'https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg',
    'https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg',
    'https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg',
    'https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg',
  ];
  let length = images.length

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 2,
    arrows: true
  };

  return(
    length >= 4 ? (
      <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
            <img
              className={`${width ? "w-full h-36 p-[2px] object-cover "  : "w-full h-20 p-[2px] object-cover " }`}
              // className={"w-full h-24 p-[2px] object-cover "}
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              />
            <div className="clear-both"></div>
          </div>
        ))}
        </Slider>
        ) : (
          <>
            {images.map((imageUrl, index) => (
                <div 
                  key={index}
                  className="float-left p-[2px] mb-2"
                >
                  <img 
                    className={`${width ? "w-36 h-36 object-cover" : "w-20 h-20 object-cover"}`} 
                    src={imageUrl} 
                    alt="" />
                  <div className="clear-both"></div>
                </div>
              ))}
          </>
        )
  )
}