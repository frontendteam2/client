import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import formatRelativeDate from '../util/date.js'

function Review(params) {
  const line = <div className="w-full h-[1px] bg-slate-500 mt-3 mb-3"></div>;
  const location = useLocation().pathname.slice(1);
  const [list, setList] = useState([]);
  const [page,setPage]=useState(1)
  const [total,setTotal]=useState(0)
  const [checkPhone,setCheckPhone]=useState(false)
  
  function handleReview(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const phone=e.target.phone.value;
    const content = e.target.content.value;
    if(checkPhone){
      
    axios.post(`http://localhost:8000/review`,{url:location,phone,name,content})
    .then(res=>{
      window.location.replace(`/${location}`);
    })
    .catch(err=>{alert('댓글작성에 실패했습니다.')})
    }
    else alert('핸드폰 번호를 다시 입력해주세요')
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/review/${location}/${page}`)
    .then(res=>{
      setTotal(res.data[0].total)
      setList(res.data)
    })
  
  }, [page])

  return (
    <section className="m-5 bg-slate-100 min-h-[100px]">
      <div className="h-7 text-left">댓글 {list[0]&&list[0].total}</div>
      <form onSubmit={handleReview}>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력해주세요"
          maxLength={10}
        />
        <input
          type="text"
          name="content"
          className="inline-block"
          maxLength={100}
          placeholder="댓글을 입력해주세요"
        />
        <input
          type="text"
          name="phone"
          className="inline-block"
          maxLength={11}
          placeholder="핸드폰번호를 입력해주세요"
          onChange={e=>{
            setCheckPhone(()=>/^(010)[0-9]{4}[0-9]{4}$/.test(e.target.value))
          }}
        />
        <button className="border rounded-md">등록</button>
      </form>
      {line}
      <ul>
        {list.map((v, i) => {
          return (
            <li key={i}>
              <div className="mb-2">
                <span>{v.name} </span>
                <span> ({`${v.phone.slice(7)}`})</span>
                <span className="text-[#888888] text-sm"> {formatRelativeDate(v.date)}</span>
              </div>
              <div className="text-wrap">
                {v.content}
              </div>
              {line}
            </li>
          );
        })}
        <li>

        </li>
      </ul>
    </section>
  );
}

export default React.memo(Review);
