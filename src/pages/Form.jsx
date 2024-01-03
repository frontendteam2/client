import { useEffect, useState } from "react";
// import Question from '../components/home/Content';
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/content/Content";
import { useMaxWidth } from "../util/useMaxWidth";

export default function Form() {
  // const [items, setItems] = useState([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [btnToggle, setBtnToggle] = useState(false);
  // const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const width = useMaxWidth();

  let state = useSelector(state => state)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const resizeListener = () => {
  //     setInnerWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", resizeListener);
  // });

  // console.log("innerWidth", width);

  const addItem = (txt) => {
    if (txt === 'image') {
      dispatch({ type: 'image' })
    } else if (txt === 'address') {
      dispatch({ type: 'address' })
    } else if (txt === 'content' && questionTitle === '') {
      alert('제목을 입력해 주세요!')
      return
    } else if (txt = 'content' && questionTitle) {
      dispatch({ type: 'content', title: questionTitle })
      setQuestionTitle('')
    }

  };

  return (
    <main className="min-h-[100vh] mb-24">
      <form className={`${width ? 'w-[50%]' : 'w-[90%]'} mx-auto block`}>
        <fieldset className="mx-auto w-[100%] box-border block">


          <h2 className="mt-28 text-lg">주소 추가하기</h2>
          <p className="text-sm mt-10 font-bold text-stone-900">
            공유할 때 사용할 내 주소 페이지의 URL을 입력해주세요. <br />
            한글, 영문 모두 사용 가능하며 모두 동일한 페이지로 이동합니다
          </p>

          <div className="text-sm mt-10 text-stone-900 font-semibold block">url을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">
              <label htmlFor="" className={`w-[30%] box-border px-3 py-4 text-stone-900  ${width ? 'text-sm' : 'text-xs'} `}>http://localhost/</label>
              <input type="text" name='url' placeholder="url을 입력해주세요." className="rounded-xl text-sm py-4 block box-border w-[70%]  bg-stone-50 px-2 box-border" /></div>
          </div>

          <div className="text-sm mt-12 text-stone-900 font-semibold block">페이지 제목을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">
              <input type="text" name='title' placeholder="페이지 제목을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-50 px-2 box-border" />
            </div>
          </div>

          {/* {state.question.map((item, index) => item)} */}
          {state && state.map((v, i) => {
            if (v.type === 'content') {
              return <Content key={i} num={i} txt={v.title} />
            }
          })}
          <div className={`${width ? 'fixed top-80 right-40 w-[250px]' : 'static w-[100%] mt-10' } `} >
            <button type="button" className={`w-[100%] px-4 py-2 box-border bg-neutral-400 font-bold rounded-md text-white`} onClick={() => setBtnToggle(!btnToggle)}>Add</button>
            <ul>
              {btnToggle &&
                <>
                  <li className="mt-3 py-1  bg-neutral-400 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('image')}>이미지 추가+</li>
                  <li className="mt-3 py-1  bg-neutral-400 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('address')}>주소 추가+</li>
                  <li className="flex mt-3">
                    <input type="text" className="w-[75%] block bg-stone-100 box-border px-2" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                    <button type="button" className="w-[25%] block text-sm align-middle  py-1 bg-neutral-400  rounded-md text-white" onClick={() => addItem('content')}>추가+</button>
                  </li>
                </>
              }
            </ul>
          </div>
        </fieldset>


      </form>

    </main>
  );
}

/* 
[[category,[title,content]],[category=picture],[url,~,~,~~],[location,[]] ]

question.map((v,i=>{
//v=배열

if(v[0]==content) return <content param num=i~~~~~>
else (v[0]==picture) return




})



*/