import { useEffect, useState } from "react";
import Question from '../components/home/Content';
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
  // const [items, setItems] = useState([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [btnToggle, setBtnToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  let state = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  // console.log("innerWidth", innerWidth);

  const addItem = (txt) => {
    console.log(txt);
    if (txt === 'image') {
      dispatch({ type: 'image' })
    } else if (txt === 'address') {
      dispatch({ type: 'address' })
    } else if (txt === 'add' && questionTitle === '') {
      alert('제목을 입력해 주세요!')
      return
    } else if (txt = 'add' && questionTitle) {
      dispatch({ type: 'add', title: questionTitle })
      setQuestionTitle('')
    }

  };

  return (
    <>
      <form className=" w-[40%] mx-auto ">
        <fieldset className="inner ">
          <div className="fixed top-80 right-40 w-[300px] ">
            <button type="button" className="w-[100%] px-4 py-2 bg-neutral-400 font-bold rounded-md text-white" onClick={() => setBtnToggle(!btnToggle)}>Add</button>
            <ul>

              {btnToggle &&
                <>
                  <li className="mt-3 py-1  bg-neutral-400 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('image')}>이미지 추가+</li>
                  <li className="mt-3 py-1  bg-neutral-400 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('address')}>주소 추가+</li>
                  <li className="flex mt-3">
                    <input type="text" className="w-[75%] block bg-stone-100 px-2" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                    <button type="button" className="w-[25%] block text-sm px-3 py-1 bg-neutral-400  rounded-md text-white" onClick={() => addItem('add')}>추가+</button>
                  </li>
                </>

              }
            </ul>


          </div>

          <h2 className="mt-28 text-lg">주소 추가하기</h2>
          <p className="text-sm mt-10 font-bold text-stone-900">
            공유할 때 사용할 내 주소 페이지의 URL을 입력해주세요. <br />
            한글, 영문 모두 사용 가능하며 모두 동일한 페이지로 이동합니다
          </p>

          <div className="text-sm mt-10 text-stone-500 font-semibold block">url을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">
              <label htmlFor="" className="w-[30%] px-3 py-4 text-stone-900 text-sm">http://localhost:3000/</label>
              <input type="text" name='url' placeholder="url을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2" /></div>
          </div>

          <div className="text-sm mt-12 text-stone-500 font-semibold block">페이지 제목을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">
              <input type="text" name='title' placeholder="페이지 제목을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2" />
            </div>
          </div>

          {state.question.map((item, index) => item)}
        </fieldset>


      </form>

    </>
  );
}