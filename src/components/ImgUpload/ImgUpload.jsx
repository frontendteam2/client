import React, { useState } from "react";
import Upload from "./Upload";
import { MdDelete } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown  } from "react-icons/io";

export default function ImgUpload(){

  const [images, setImages] = useState([]);

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
      <div className="text-sm mt-10 font-bold">
        <div className="text-sm mt-12 text-stone-500 font-semibold block">갤러리 - 최대 5장까지 업로드 할 수 있습니다. (옵션)</div>
        <input type="hidden" name="images" value={images} />
        <Upload getImage={getImage}/>
        <div className="rounded-xl text-sm py-4 block flex-1 bg-white px-2 mt-5 border-2 border-stone-200">
        { 
          images.map((img, i) => (
          <div key={i} className="flex mb-7">
            <img src={`http://localhost:8000/${img}`} alt="" className="w-20"/>
            <div className="flex-col">
              <input className="rounded-xl text-sm py-4 bg-stone-100 px-2 ml-5" type="text" placeholder="이미지 설명을 간단하게 넣어주세요 (옵션)"/>
              <div className="flex justify-between mt-2 ml-5">
                <div className="flex">
                  <p className="mr-3"><IoIosArrowUp className="cursor-pointer" onClick={() => handleListUp(i)}/></p>
                  <p className="mr-3"><IoIosArrowDown className="cursor-pointer" onClick={() => handleListDown(i)}/></p>
                </div>
                <div>
                  <MdDelete className="cursor-pointer" onClick={() => handleDelete(i)}/>
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