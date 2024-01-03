import { useEffect, useState } from "react";
import { useMaxWidth } from "../util/useMaxWidth";

export default function Home() {
  const width = useMaxWidth();

  return (
    <main
      className={`${
        width ? "max-w-[1200px] mx-auto" : "w-full whitespace-nowrap"
      } text-gray-500`}
    >
      <section>
        <h1>
          <div
            className={`${
              width ? "text-5xl " : "text-2xl"
            } text-center font-extrabold text-[#989A9E] mb-10 pt-32`}
          >
            장소를 알리는
            <br />
            가장 쉬운 방법
          </div>
          <div className="text-center mb-24">
            <span
              className={`${
                width ? "text-8xl " : "text-4xl"
              }  text-black font-bold font-['JalnanGothic']
              bg-gradient-to-br from-black from-50% to-gray-300 bg-clip-text text-transparent
              
              `}
            >
              여기서 만나요
            </span>
          </div>
        </h1>

        <div className="flex items-center justify-center mb-11">
          <div className="w-[200px] h-[1px] bg-[#989A9E]" />
          <div className="mx-[10px] w-[200px] text-center text-[#989A9E]">
            지금 바로 만들어보세요!
          </div>
          <div className="w-[200px] h-[1px] bg-[#989A9E]" />
        </div>
        <div className="mb-11">
          <button className="bg-[#7B62FF] rounded-2xl px-3 py-2 text-1xl text-white font-extrabold border-2 border-white mx-auto block">
            나만의 공유 페이지 만들기
          </button>
        </div>
        <div className={`max-w-[1200px] flex mb-20 ${width?'':'flex-wrap'} justify-center`}>
          <div className={` min-w-[150px] max-w-[300px] ${width?'mx-[30px]':'m-[5px]'}`}>
            <img src="./mainBox1.png" alt="" />
          </div>
          <div className={` min-w-[150px] max-w-[300px] ${width?'mx-[30px]':'m-[5px]'}`}>
            <img src="./mainBox2.png" alt="" />
          </div>
          <div className={` min-w-[150px] max-w-[300px] ${width?'mx-[30px]':'m-[5px]'}`}>
            <img src="./mainBox3.png" alt="" />
          </div>
          <div className={` min-w-[150px] max-w-[300px] ${width?'mx-[30px]':'m-[5px]'}`}>
            <img src="./mainBox4.png" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-center mb-11">
          <div className="w-[150px] h-[1px] bg-[#989A9E]" />
          <div className="mx-[10px] w-[300px] text-center text-[#989A9E]">
          어떻게 보일까 직접 확인해보세요
          </div>
          <div className="w-[150px] h-[1px] bg-[#989A9E]" />
        </div>

        <div className="max-w-[600px] mx-auto mb-1"><img src="./sample.jpg" alt="" className="w-full"/></div>
        <div className="w-full text-center mb-20">
          <button className="bg-[#7B62FF] rounded-2xl px-3 py-2 text-1xl text-white font-extrabold border-2 border-white mx-auto block">
            데모 보기
          </button></div>
      </section>
    </main>
  );
}
