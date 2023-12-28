import { useState,useEffect, useReducer } from "react";

export function useMaxWidth(){
  const [innerWidth, setInnerWidth] = useState(window.innerWidth>800?true:false);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(state=>window.innerWidth>800?true:false);
    };
    window.addEventListener("resize", resizeListener);
  },[]);

  return innerWidth
}