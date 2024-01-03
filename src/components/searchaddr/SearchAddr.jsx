import React, { useEffect, useState } from "react";

export default function SearchAddr(){

  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
      
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.querySelector(".searchaddr");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      
      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  return(
    <>
      <div className="searchaddr size-80">asd</div>
    </>
  );
}