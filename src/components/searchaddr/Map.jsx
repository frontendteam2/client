import React, { useEffect, useState } from "react";
const { kakao } = window;

export default function Map({search, subSearch}) {
  const [values, setValues] = useState([]); // 도로명주소, 위도, 경도, 상세주소
  
  useEffect(() => {
    mapscript();
  }, [search,subSearch]);

  const mapscript = () => {
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.49469623834261, 127.03008084233805),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    let ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(search, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
        setValues([
          place.road_address_name,
          place.y,
          place.x,
          subSearch
        ]);
      });
    }
  };
  console.log(values);

  return(
    <div>
      <input type="hidden" name="values" value={values} />
      <div id="map" className="w-full h-96 border-4 border-gray-800"></div>
    </div>
  );
}