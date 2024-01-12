import { useState, useEffect, useRef } from "react";
// import Question from '../components/home/Content';
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/content/Content";
import { useMaxWidth } from "../util/useMaxWidth";
import ImgUpload from './../components/ImgUpload/ImgUpload';
import SearchAddr from './../components/searchaddr/SearchAddr';
import axios from "axios";

import { FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [btnToggle, setBtnToggle] = useState(false);
  const [urlCheck, setUrlCheck] = useState(true);
  const [mapCheck, setMapCheck] = useState(false)
  const width = useMaxWidth();
  const navigate = useNavigate();

  const inputTitle = useRef(null);
  const inputUrl = useRef(null);

  let state = useSelector(state => state)
  console.log(state);
  const dispatch = useDispatch();


  const addItem = (txt) => {

    if (txt === 'content' && questionTitle === '') {
      alert('제목을 입력해 주세요!')
      return
    } else if (txt === 'content' && questionTitle) {
      dispatch({ type: 'content', title: questionTitle })
      setQuestionTitle('')
    } else if (txt === 'address') {
      if (!mapCheck) {
        dispatch({ type: txt })
        setMapCheck(true)
      }else{
        alert('주소는 하나만 등록이 가능합니다!')
      }
    } else if(txt === 'image'){
      dispatch({ type: txt })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {

      if (!key.includes('content') && !key.includes('image') && !key.includes('address') && !key.includes('search') && !key.includes('subSearch')) {
        formDataObject[key] = value
      }
    })

    if (formDataObject.url === '') {
      alert('url을 입력해주세요.')
      return inputUrl.current.focus()
    } else if (!urlCheck) {
      alert('사용할 수 없는 url입니다.')
      return inputUrl.current.focus()
    }
    if (formDataObject.title === '') {
      alert('제목을 입력해주세요.')
      return inputTitle.current.focus()
    }

    let copyData = [...state];
    let i = 0;
    formData.forEach((value, key) => {
      if (key.includes('content')) {
        copyData[i] = { category: copyData[i].category, content: value }
        i++;
      } else if (key.includes('image')) {
        copyData[i] = { category: copyData[i].category, content: value }
        i++;
      } else if (key.includes('address')) {

        copyData[i] = { category: copyData[i].category, content: value }
        i++;
      }
    });

    const userConfirmed = window.confirm('페이지를 발행 하시겠습니까 ?');
    if (userConfirmed) {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/newForm`,
        data: [formDataObject, copyData],
      })
        .then(result => {
          // const userConfirmed2 = window.confirm('만든 페이지로 이동하시겠습니까?');
          // userConfirmed2 ? navigate(`/view/${urlCheck}`) : navigate(`/`)
        })
        .catch(err => console.log('에러==>' + err))
    }

  }

  const checkUrl = (e) => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/newForm/${e.target.value}`,
    })
      .then(result => {
        setUrlCheck(result.data.cnt === 0 ? e.target.value : false)
      })
      .catch(err => console.log('에러==>' + err))
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
            <div className="flex text-center ">
              <label htmlFor="" className={`w-[30%] box-border px-3 py-4 text-stone-900  ${width ? 'text-sm' : 'text-xs'} `}>http://localhost/</label>
              <input type="text" maxLength='20' ref={inputUrl} onBlur={(e) => checkUrl(e)} name='url' placeholder="url을 입력해주세요." className="rounded-xl text-sm py-4 block w-[70%]  bg-stone-50 px-2 box-border" /></div>
          </div>
          {!urlCheck && <p className="text-red-400 font-bold px-5 py-3 flex"><FaBan /><span className="relative bottom-1 left-1">사용할 수 없는 url입니다.</span></p>}

          <div className="text-sm mt-12 text-stone-900 font-semibold block">페이지 제목을 입력해주세요</div>
          <div className="mt-5 rounded-xl bg-stone-200">
            <div className="flex text-center ">
              <input type="text" name='title' ref={inputTitle} maxLength='20' placeholder="페이지 제목을 입력해주세요." className="rounded-xl text-sm py-4 block flex-1 bg-stone-50 px-2 box-border" />
            </div>
          </div>

          {/* {state.question.map((item, index) => item)} */}
          {state && state.map((v, i) => {
            if (v.category === '이미지') {
              return <ImgUpload key={i} num={i} />
            } else if (v.category === '주소') {
              return <SearchAddr key={i} num={i} />
            } else {
              return <Content key={i} num={i} category={v.category} />
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
              <button className="mt-3 w-[100%]  bg-neutral-400 hover:bg-neutral-500 py-2  text-center text-white font-bold  rounded-md cursor-pointer" >발행 하기</button>

            </ul>
          </div>
        </fieldset>


      </form>

    </main>
  );
}

