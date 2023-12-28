import { useEffect, useState } from "react";
import Question from '../components/home/Content';

export default function Form() {
  const [items, setItems] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  console.log("innerWidth", innerWidth);

  const addItem = (txt) => {
    // 다른 컴포넌트를 배열에 추가
    setItems(prevItems => [
      ...prevItems,
      <Question key={prevItems.length} num={prevItems.length} txt={txt} />
    ]);
  };

  return (
    <>
      <form className=" w-[40%] mx-auto ">
        <fieldset className="inner">
          <button type="button" className="fixed top-64 right-40" onClick={() => addItem('content')}>Add Item</button>
          <h2 className="mt-28 text-lg">주소 추가하기</h2>
          <p className="text-sm mt-10 font-bold text-stone-900">
            공유할 때 사용할 내 주소 페이지의 URL을 입력해주세요. <br />
            한글, 영문 모두 사용 가능하며 모두 동일한 페이지로 이동합니다
          </p>

          <div className="text-sm mt-10 text-stone-500 font-semibold block">url을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center "><label htmlFor="" className="w-[30%] px-3 py-4 text-stone-900 text-sm">http://localhost:3000/</label> <input type="text" placeholder="url을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2" /></div>
          </div>

          <div className="text-sm mt-12 text-stone-500 font-semibold block">페이지 제목을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center "><input type="text" placeholder="페이지 제목을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2" /></div>
          </div>

          {items.map((item, index) => item)}
        </fieldset>


      </form>

    </>
  );
}