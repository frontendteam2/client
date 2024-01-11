import React, { useEffect, useRef } from "react";
import { MdContentCopy } from 'react-icons/md';
import { useMaxWidth } from "../../util/useMaxWidth";

const { kakao } = window;

const Kakao = ({addr ,address, center, markerPosition}) => {
  const width = useMaxWidth();
  const mapContainerRef = useRef(null);
  const addressList = addr.split(',');
  

  // 주소 복사
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 주소가 복사되었습니다!");
    } catch (err) {
      console.log(err);
    }
  };

  const initializeMap = () => {
    let container = mapContainerRef.current;
    let options = {
      center: center || new kakao.maps.LatLng(addressList[1], addressList[2]),
      level: 3,
    };

    // 지도 생성 및 객체 리턴
    let map = new kakao.maps.Map(container, options);

    // 표시 될 위치
    let markerPositon = markerPosition || new kakao.maps.LatLng(addressList[1], addressList[2]);

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: markerPositon,
    });

    // 지도위에 표시
    marker.setMap(map);
  };

  useEffect(() => {
    initializeMap();
  }, [address, center, markerPosition]); // 프로퍼티가 변경될 때마다 실행

  return (
    <>
      <div className={"w-full h-20  bg-gray-200 border-none rounded-3xl flex p-5 mt-3 "}>
        <p className={"overflow-hidden whitespace-nowrap text-ellipsis text-[.85rem] mt-3"}>
          {addressList[0]}
        </p>
        <div className="flex-grow"></div>
        <MdContentCopy className="mt-3 ml-1 w-10" onClick={() => handleCopyClipBoard(addressList[0])} />
      </div>
      <div
        ref={mapContainerRef}
        id="map"
        className={`${width ? "h-96 w-full border-2 mt-5 " : "h-72 w-full border-2 mt-5 "} `}
      ></div>
    </>
  );
};

export default Kakao;
