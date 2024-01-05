
import { useState, useEffect, useRef } from "react";

// import Question from '../components/home/Content';
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/content/Content";
import { useMaxWidth } from "../util/useMaxWidth";

import ImgUpload from './../components/ImgUpload/ImgUpload';
import SearchAddr from './../components/searchaddr/SearchAddr';
import axios from "axios";


export default function Form() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [btnToggle, setBtnToggle] = useState(false);

  let [detailForm, setDetailForm] = useState([]);
  const width = useMaxWidth();

  const inputTitle = useRef(null);
  const inputUrl = useRef(null);


  let state = useSelector(state => state)

  const dispatch = useDispatch();


  useEffect(() => {
    // state가 변경될 때마다 detailForm을 업데이트
    setDetailForm([...state]);
  }, [state]); // state가 변경될 때만 useEffect가 실행되도록 설정
  // 나머지 컴포넌트 로직...
  console.log(detailForm);
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      if (!key.includes('content') && !key.includes('image') && !key.includes('address')) {
        formDataObject[key] = value
      }
    })

    if (formDataObject.url === '') {
      alert('url을 입력해주세요.')
      return inputUrl.current.focus()
    }
    if (formDataObject.title === '') {
      alert('제목을 입력해주세요.')
      return inputTitle.current.focus()
    }

    let i = 0;

    formData.forEach((value, key) => {
      if (key.includes('content') && i >= detailForm.length) {
        setDetailForm(prevDetailForm => [...prevDetailForm, { content: value }]);
        i++
      } else if (key.includes('image') && i >= detailForm.length) {
        setDetailForm(prevDetailForm => [...prevDetailForm, { image: value }]);
        i++
      } else if (key.includes('address') && i >= detailForm.length) {
        setDetailForm(prevDetailForm => [...prevDetailForm, { address: value }]);
        i++
      }
    });
    const userConfirmed = window.confirm('하실?.');
    if (userConfirmed) {
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/newForm`,
      data: [formDataObject, detailForm],
    })
      .then(result => {
      })
      .catch(err => console.log('에러==>' + err))
    }

  }

  return (
    <main className="min-h-[100vh] mb-24">
      <form onSubmit={handleSubmit} className={`${width ? 'w-[50%]' : 'w-[90%]'} mx-auto block`}>
        <fieldset className="mx-auto w-[100%] box-border block">



          <h2 className="mt-28 text-2xl font-bold">주소 추가하기</h2>
          <p className="text-sm mt-10 font-bold text-stone-900">
            공유할 때 사용할 내 주소 페이지의 URL을 입력해주세요. <br />
            한글, 영문 모두 사용 가능하며 모두 동일한 페이지로 이동합니다
          </p>

          <div className="text-sm mt-10 text-stone-900 font-semibold block">url을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">
              <label htmlFor="" className={`w-[30%] box-border px-3 py-4 text-stone-900  ${width ? 'text-sm' : 'text-xs'} `}>http://localhost/</label>

              <input type="text" maxLength='20' ref={inputUrl} name='url' placeholder="url을 입력해주세요." className="rounded-xl text-sm py-4 block box-border w-[70%]  bg-stone-50 px-2 box-border" /></div>

          </div>

          <div className="text-sm mt-12 text-stone-900 font-semibold block">페이지 제목을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="block flex text-center ">

              <input type="text" name='title' ref={inputTitle} maxLength='20' placeholder="페이지 제목을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-50 px-2 box-border" />

            </div>
          </div>

          {/* {state.question.map((item, index) => item)} */}
          {state && state.map((v, i) => {
            if (v.type === 'content') {
              return <Content key={i} num={i} txt={v.title} />

            } else if (v.type === 'image') {
              return <ImgUpload key={i} num={i} />
            } else if (v.type === 'address') {
              return <SearchAddr key={i} num={i} />
            }
          })}
          <div className={`${width ? 'fixed top-80 right-40 w-[250px]' : 'static w-[100%] mt-10'} `} >
            <button type="button" className={`w-[100%] px-4 py-2 box-border hover:bg-neutral-500 bg-neutral-400 font-bold rounded-md text-white`} onClick={() => setBtnToggle(!btnToggle)}>Add</button>
            <ul>
              {btnToggle &&
                <>
                  <li className="mt-3 py-1  bg-neutral-400 hover:bg-neutral-500 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('image')}>이미지 추가+</li>
                  <li className="mt-3 py-1  bg-neutral-400 hover:bg-neutral-500 text-center text-white rounded-md cursor-pointer" onClick={() => addItem('address')}>주소 추가+</li>
                  <li className="flex mt-3">
                    <input type="text" maxLength='10' className="w-[75%] block bg-stone-100 box-border px-2" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
                    <button type="button" className="w-[25%] block text-sm align-middle  py-1 bg-neutral-400 hover:bg-neutral-500  rounded-md text-white" onClick={() => addItem('content')}>추가+</button>
                  </li>
                </>
              }
              <button className="mt-3 py-1 w-[100%]  bg-neutral-400 hover:bg-neutral-500 py-2  text-center text-white font-bold  rounded-md cursor-pointer" >저장 하기</button>


            </ul>
          </div>
        </fieldset>


      </form>

    </main>
  );
}


