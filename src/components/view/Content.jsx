import React from "react";
import { IoMdArrowDroprightCircle } from "react-icons/io";


export default function Content({stitle,content}){

  return(
    <div className=" mt-7">
      <div>
        <IoMdArrowDroprightCircle className="float-left mr-1" />
        <p className="text-[.85rem]">{stitle}</p>
      </div>
      <p className="w-full text-[.75rem]  p-2 text-neutral-500 font-['Nanum Gothic Coding']">
        {content}
      </p>
    </div>
  )
}