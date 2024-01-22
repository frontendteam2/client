import React, { useState } from "react";
import Upload from "./Upload";
import { MdDelete } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

export default function ImgUpload(props){

  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  /* 이미지가져오기 */
  const getImage = (e) => {
    if(e){ // 이미지를 열지않고 취소를 누르면 빈값의 리스트가 출력되므로 e 값이 있을때의 조건문을 넣어줌
      if (images.length >= 5) {
        alert("이미지는 최대 5장까지 업로드 가능합니다.");
        return;
      }
      setImages([...images, e]);
    }
    
  }

  /* 선택한 리스트 삭제 */
  const handleDelete = (e) => {
    const updatedImages = [...images];
    updatedImages.splice(e, 1);
    setImages(updatedImages);
  }

  /* 선택한 리스트 순서 올리기, 내리기 */
  const handleListUp = (index) => {
    if (index > 0) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index - 1];
      updatedImages[index - 1] = temp;
      setImages(updatedImages);
    }
  }
  const handleListDown = (index) => {
    if (index < images.length - 1) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index + 1];
      updatedImages[index + 1] = temp;
      setImages(updatedImages);
    }
  }
  
  return(
    <>
      <div className="text-sm mt-10 ">
        <div className="text-sm mt-12 text-stone-700  block  font-['JalnanGothic']">갤러리 - 최대 5장까지 업로드 할 수 있습니다. (옵션)<button type="button" onClick={(e)=> dispatch({ type: 'close', num: props.num })}  className="ml-5"><IoClose /></button></div>
        <input type="hidden" name="images" value={images} />
        <Upload getImage={getImage}/>
        <div className="rounded-xl text-sm py-4 block flex-1 bg-white px-5 mt-5 border-2 border-stone-200">
        { 
          images.map((img, i) => (
          <div key={i} className="flex mb-7">
            <img src={`http://localhost:8000/${img}`} alt="" className="w-20"/>
            <div className="flex-col w-4/5">
              <div className="flex justify-between items-center ml-5 h-full">
                <div className="text-3xl h-full flex flex-col justify-between">
                  <p className="mr-3"><IoIosArrowUp className="cursor-pointer" onClick={() => handleListUp(i)}/></p>
                  <p className="mr-3"><IoIosArrowDown className="cursor-pointer" onClick={() => handleListDown(i)}/></p>
                </div>
                <div>
                  <MdDelete className="cursor-pointer text-3xl" onClick={() => handleDelete(i)}/>
                </div>
              </div>
            </div>
          </div>
          ))
        }
        </div>
      </div>
    </>
  );
}