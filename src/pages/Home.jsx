import { useEffect,useState } from "react";
import {useMaxWidth} from '../util/useMaxWidth'

export default function Home() {

  const width=useMaxWidth()
  
  return (
    <main className={`${width?"max-w-[1200px] mx-auto":"w-full whitespace-nowrap"} text-gray-500 border`}>
      <section>
        <h1>
          <div className={`${width?"text-6xl ":"text-2xl"} text-center border`}>
            행사를 알리는<br/>가장 쉬운 방법
          </div>
          <div className={`${width?"text-8xl ":"text-4xl"} text-center text-black font-bold`}>여기서 만나요</div>
        </h1>
        <div>지금 바로 만들어보세요!</div>
      </section>
      
    </main>
  );
}
