import React, { useEffect } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMaxWidth } from "../../util/useMaxWidth";

const { kakao } = window

export default function Kakao(){
  const width = useMaxWidth();

  useEffect(()=>{

    let container = document.getElementById('map')
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
      level: 3 //축척 크기
    }
    
    //지도 생성 및 객체 리턴
    let map = new kakao.maps.Map(container, options) 

    //표시 될 위치
    let markerPositon = new kakao.maps.LatLng(
      33.450701, 
      126.570667
    )

    //마커 생성
    let marker = new kakao.maps.Marker({
      position: markerPositon,
    }) 

    //지도위에 표시
    marker.setMap(map);

  },[])

  return(
    <div 
      id="map" 
      className={`${width ? "h-96 w-full border-2 mt-5 " : "h-72 w-full border-2 mt-5 "} `} >
    </div>
  )
}