import React, { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import { MdContentCopy } from 'react-icons/md';


export default function View(){
  let [modal, setModal] = useState(false)

  //주소복사

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 주소가 복사되었습니다!");
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <div className="w-3/5 m-auto ">
      <div className="box1 w-full flex mt-3">
        <div className="inline float-left font-bold ">
            <h2 className="text-3xl inline-flex">해빗팩토리</h2>
            <div className=" text-neutral-400 text-sm mt-2">
              <p className="float-left ">지번 주소 보기</p>
              <IoIosArrowDown className= "text-xl" onClick={()=>{setModal(!modal)}}/>
            </div>
        </div>
        <div className="flex-grow"></div> 
        <img className="h-12 object-cover inline" src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_217b6bd0-dc29-481c-848b-78738aa2055b.png" alt="" />
      </div>

      <div className="clear-both"></div>

        { modal == true ? ( 
          <ul className="w-40 h-50 p-2 absolute bg-white text-s font-bold border-2 rounded-xl">
            <li className="p-1 text-sm">도로명 주소 보기</li>
            <li><hr /></li>
            <li className="p-1 text-sm">지번 주소 보기</li>
          </ul>
          ) : null
        }

        <div className="w-full h-20  bg-gray-200 border-none rounded-3xl flex p-7 mt-3">
          <p className="copy font-bold text-l">서울 강남구 역삼로25길 36 (역삼동)</p>
          <div className="flex-grow"></div>
          <MdContentCopy className="mt-1" onClick={()=>{handleCopyClipBoard('복사')}}/>
        </div>

        <div className="w-full h-80 border-2 mt-5 " >
          지도
        </div>

        <div className="border-b-2 border-gray-100 mt-5 mb-5">
          <p className="font-bold">사진보기</p>
          <img className="w-36 h-36 object-cover float-left pr-2" src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg" alt="" />
          <img className="w-36 h-36 object-cover mb-3 pr-2" src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg" alt="" />
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <p className="font-bold">오시는 방법</p>
          <span className="w-full text-sm ">
            건물 외벽에 시그널플래너 로고를 찾으시면 됩니다.
          </span>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <p className="font-bold">무료주차장</p>
          <span className="w-full text-sm m-3">
            건물 1층에 무료 주차 가능합니다.
          </span>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <p className="font-bold">다른 앱에서 보기</p>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <p className="font-bold">알리고 싶은 추가 정보</p>
          <span className="w-full text-sm m-3">
            해빗팩토리 소개
          </span>
        </div>

        <button type="button" className="font-bold block p-3 m-auto mt-10 bg-gray-200 border-none rounded-2xl">
          나도 만들기
        </button>

        <br /><br /><br />
    </div>
  )
}