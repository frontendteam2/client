import { useEffect, useRef, useState } from "react";
import Map from "./Map";

/**
 * 
 * <input name=values> 에 값 저장
 * values=[ place.road_address_name(도로명주소), place.y(위도), place.x(경도), subSearch(상세주소), place.place_url(해당주소정보링크), place.address_name(지번주소)]
 * 
 * @returns <div>주소 찾기</div>
 */
export default function SearchAddr({buttonPress}) {
  const inputSearch = useRef(null);
  const inputSubSearch = useRef(null);
  const resultRoadAddr = useRef(null)
  const resultAddr = useRef(null)

  const [search, setSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [watch, setWatch] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [placeInfo,setPlaceInfo]=useState([])
  const [values, setValues] = useState([]); // 도로명주소, 위도, 경도, 상세주소

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleClick = () => {
    setWatch(true);
  }

  const handleClose = () => {
    setWatch(false);
  }

  const handleChangeAddr = (e) => {
    setSubSearch(()=>inputSubSearch.current.value)
    
  }

  const handleCheck = () => {
    setReadOnly(true)
    setWatch(false)
    setValues([...placeInfo,subSearch])
    buttonPress(true)
    // setSubSearch(() => inputSubSearch.current.value)
  }


  return (
    <>
      <div className="text-sm mt-10 font-bold">
        <div className="text-sm mt-12 text-stone-500 font-semibold block">주소 찾기</div>
        <div className="border-1">
          
            <input
              type="text"
              name="search"
              ref={inputSearch}
              className="rounded-xl text-sm py-4 bg-stone-100 px-2 w-full mt-5"
              placeholder="장소를 검색해주세요"
              autocomplete="off"
              readOnly={readOnly}
              onClick={handleClick}
              onChange={e => setSearch(e.target.value)}
            />
            
          
          {watch &&
            <>
              <div className="relative text-sm block flex-1 bg-white mt-5 border-1 border-gray-800">

                <img src="https://t1.daumcdn.net/postcode/resource/images/close.png" className="absolute top-0 right-0 cursor-pointer z-10 w-6" onClick={handleClose} />

                <Map // 로드뷰를 표시할 Container
                  search={search}
                  subSearch={subSearch}
                  className="text-sm block flex-1 bg-white mt-4 border-2 border-black"
                  setPlaceInfo={setPlaceInfo}
                >
                </Map>
              </div>
            </>
          }
          <div className={`rounded-xl text-sm py-4 block bg-stone-100 mt-3 px-2 ${values[0] ? '' : 'text-[#999999]'}`} ref={resultRoadAddr}>{placeInfo[0] ?? "도로명 주소"}</div>
          <div className={`rounded-xl text-sm py-4 block bg-stone-100 mt-3 px-2 ${values[0] ? '' : 'text-[#999999]'}`} ref={resultAddr}>{placeInfo[4] ?? "번지 주소"}</div>
          <input
            type="text"
            ref={inputSubSearch}
            name="subSearch"
            className="rounded-xl text-sm py-4 block bg-stone-100 mt-3 px-2 w-full"
            placeholder="상세 주소" 
            readOnly={readOnly}
            maxLength={100}
            value={subSearch}
            onChange={e=>handleChangeAddr()}
          />

          <button type="button" className="mt-3 p-3 bg-stone-100 border-slate-600" onClick={handleCheck}>장소 확정</button>
        </div>
        <input type="hidden" name="address" value={values} />
      </div>
    </>
  )
}