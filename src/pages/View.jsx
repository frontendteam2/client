import React, { useEffect, useState } from "react"
import { IoIosArrowDown } from 'react-icons/io';
import { useMaxWidth } from "../util/useMaxWidth";
import Kakao from "../components/view/Kakao";
import Slide from "../components/view/Slide";
import Content from "../components/view/Content";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


export default function View(){
  let [modal, setModal] = useState(false)
  const width = useMaxWidth();
  let { url } = useParams();
  let [list, setList]  = useState([]);
  let urlCheck =list.length > 0 && url === list[0].url;

  useEffect(()=>{
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/view/${url}`,
    })
    .then((result) => {
      setList(result.data)
    })
    .catch((err)=>console.log(err))
  },[])
  
  return(
    <div className={`${width ? " " : "min-w-[400px]"} w-[40%] p-10 mx-auto font-['JalnanGothic']`}>
      {urlCheck ? (
        <>
          <div className="box1 w-full flex mt-3">
            <div className="inline float-left ">
                <h2 className="text-3xl inline-flex font-['JalnanGothic']">{list[0].title}</h2>
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

          {list.map((a, index) => {
            if (a.category === '주소') {
              return (
                <Kakao
                  key = {index}
                  addr = {a.content}
                  address = {a.address}
                  center = {a.center}
                  markerPosition = {a.markerPosition}
                />
              );
            } else if (a.category === '이미지') {
              return (
                <Slide  
                  key = {index} 
                  img = {a.content}
                />
              );
            } else {
              return (
                <Content 
                  key={index} 
                  stitle = {a.category}
                  content= {a.content}
                />
              );
            }
          })}

            <Link className="w-28 h-10 block p-3 mx-auto mt-10 bg-gray-200 border-none rounded-2xl text-[.8rem]">
              <p className="text-center">
                나도 만들기
              </p>
            </Link>
          </>
          ):(
            <div>
              NO~
            </div>
          )}
      </div>

  )
}
