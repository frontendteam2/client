import { useState,useEffect, useReducer } from "react";
/**
 * @brief window.innerWidth>800?true:false
 * 
 * @returns boolean
 */
export function useMaxWidth(w=800){
  const [innerWidth, setInnerWidth] = useState(window.innerWidth>800?true:false);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(state=>window.innerWidth>w?true:false);
    };
    window.addEventListener("resize", resizeListener);
  },[]);

  return innerWidth
}