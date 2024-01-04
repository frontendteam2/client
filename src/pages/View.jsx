import React, { useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import { MdContentCopy } from 'react-icons/md';
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useMaxWidth } from "../util/useMaxWidth";
import Kakao from "../components/view/Kakao";
import Slide from "../components/view/Slide";

export default function View(){
  let [modal, setModal] = useState(false)
  const width = useMaxWidth();

  //주소복사
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 주소가 복사되었습니다!");
    } catch (err) {
      console.log(err);
    }
  };

  //사진 슬라이드
  

  return(
  <div className={`${width ? " " : "min-w-[400px]"} w-1/2 p-10 mx-auto font-['JalnanGothic']`}>
  {/* // <div className={`min-w-[150px] max-w-[300px] ${width?'mx-[30px]':'m-[5px]'} w-1/2 mx-auto font-['JalnanGothic']`}> */}
      <div className="box1 w-full flex mt-3">
        <div className="inline float-left ">
            <h2 className="text-3xl inline-flex font-['JalnanGothic']">해빗팩토리</h2>
            <div className=" text-neutral-400 text-sm mt-1">
              <p className="float-left">지번 주소 보기</p>
              <IoIosArrowDown className= "text-xl" onClick={()=>{setModal(!modal)}}/>
            </div>
        </div>
        <div className="flex-grow"></div> 
        <img className="h-12 object-cover inline" src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_217b6bd0-dc29-481c-848b-78738aa2055b.png" alt="" />
      </div>

      <div className="clear-both"></div>

        { modal == true ? ( 
          <ul className="w-40 h-50 p-2 absolute bg-white text-s  border-2 rounded-xl">
            <li className="p-1 text-[.8rem]">도로명 주소 보기</li>
            <li><hr /></li>
            <li className="p-1 text-[.8rem]">지번 주소 보기</li>
          </ul>
          ) : null
        }

        <div className={"w-full h-20  bg-gray-200 border-none rounded-3xl flex p-5 mt-3 "}>
          <p className={"overflow-hidden whitespace-nowrap text-ellipsis text-[.85rem] mt-3"}>
            제주 제주시 첨단로 242
          </p>
          <div className="flex-grow"></div>
          <MdContentCopy className="mt-3 ml-1 w-10" onClick={()=>{handleCopyClipBoard('복사')}}/>
        </div> 

        {/* 지도 */}
        <Kakao/>

        <div className="border-b-2 border-gray-100 mt-7 ">
          <div>
            <IoMdArrowDroprightCircle className="float-left mr-1" />
            <p className="text-[.85rem] ">사진보기</p>
          </div>
          <img className={`${width ? "w-36 h-36 object-cover float-left pt-2 pb-2 pl-1" : "w-24 h-24 object-cover float-left pt-2 pb-2 pl-1"}`} src="https://juso-io.s3.ap-northeast-2.amazonaws.com/upload/63_4e495b68-18c3-466f-bb6a-a2c8fc9d18a1.jpeg" alt="" />
          {/* <Slide /> */}
          <div className="clear-both"></div>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <div>
            <IoMdArrowDroprightCircle className="float-left mr-1" />
            <p className="text-[.85rem]">오시는 길</p>
          </div>
          <p className="w-full text-[.75rem]  p-2 text-neutral-500 font-['Nanum Gothic Coding']">
            건물 외벽에 시그널플래너 로고를 찾으시면 됩니다.<br></br>
            건물 외벽에 시그널플래너 로고를 찾으시면 됩니다.<br></br>
            건물 외벽에 시그널플래너 로고를 찾으시면 됩니다.<br></br>
          </p>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <div>
            <IoMdArrowDroprightCircle className="float-left mr-1" />
            <p className="text-[.85rem]">무료주차장</p>
          </div>
          <p className="w-full text-[.75rem]  p-2 text-neutral-500 font-['Nanum Gothic Coding']">
            건물 1층에 무료 주차 가능합니다. <br />
            건물 1층에 무료 주차 가능합니다. <br />
            건물 1층에 무료 주차 가능합니다. <br />
          </p>
        </div>

        <div className="border-b-2 border-gray-100 mt-7">
          <div>
            <IoMdArrowDroprightCircle className="float-left mr-1" />
            <p className="text-[.85rem]">알리고 싶은 추가정보</p>
          </div>
          <p className="w-full text-[.75rem] p-2 text-neutral-500 font-['Nanum Gothic Coding']">
            해빗팩토리 소개 <br />
            해빗팩토리 소개 <br />
            해빗팩토리 소개 <br />
          </p>
        </div>

        <button type="button" className=" block p-3 m-auto mt-10 bg-gray-200 border-none rounded-2xl text-[.8rem]">
          나도 만들기
        </button>
    </div>
  )
}