import React from "react";

export default function ImgUpload(){

  return(
    <>
      <div className="text-sm mt-10 font-bold text-stone-900">
        <div className="text-sm mt-12 text-stone-500 font-semibold block">갤러리 - 최대 5장까지 업로드 할 수 있습니다. (옵션)</div>
        <input type="file" accept="image/jpeg, image/jpg, image/png, image/gif" className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2 mt-5" />
        <div className="rounded-xl text-sm py-4 block flex-1 bg-white px-2 mt-5 border-2 border-stone-200">111</div>
      </div>
    </>
  );
}