import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import formatRelativeDate from "../../util/date.js";

function Review(params) {
  const line = <div className="w-full h-[1px] bg-slate-500 mt-3 mb-3"></div>;
  const location = useLocation().pathname.slice(1);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [checkPhone, setCheckPhone] = useState(false);
  const [paging, setPaging] = useState({});
  const [pageList, setPageList] = useState([]);

  function handleReview(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const content = e.target.content.value;
    if (checkPhone) {
      axios
        .post(`http://localhost:8000/review`, {
          url: location,
          phone,
          name,
          content,
        })
        .then((res) => {
          window.location.replace(`/${location}`);
        })
        .catch((err) => {
          alert("댓글작성에 실패했습니다.");
        });
    } else alert('핸드폰 번호에 "-"을 빼고 숫자만 입력해주세요');
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/review/${location}/${page}`)
      .then((res) => {
        setTotal(res.data[0].total);
        setList(res.data);
      });
  }, []);

  useEffect(() => {
    //total = 총 갯수
    //bottomSize = 하단크기
    //listSize = 화면에서 보여줄 크기
    //page = 현재 나의 페이지
    let bottomSize = 5;
    let listSize = 10;
    let totalPageSize = Math.ceil(total / listSize); //한 화면에 보여줄 갯수에서 구한 하단 총 갯수

    let firstBottomNumber = page - ((page-1) % bottomSize); //하단 최초 숫자
    let lastBottomNumber = page - ((page-1) % bottomSize) + bottomSize-1; //하단 마지막 숫자

    if (lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize; //총 갯수보다 큰 경우 방지

    setPaging((paging) => {
      return {
        ...paging,
        firstBottomNumber,
        lastBottomNumber,
        totalPageSize,
        bottomSize,
        listSize,
      };
    });
  }, [page,total]);

  useEffect(() => {
    setPageList(
      Array.from({
        length: paging.lastBottomNumber - paging.firstBottomNumber + 1,
      })
    );
    console.log(paging,page)
  }, [paging]);
  return (
    <section className="m-5 bg-slate-100 min-h-[100px]">
      <div className="h-7 text-left">댓글 {list[0] && list[0].total}</div>
      <form onSubmit={handleReview}>
        <input type="text" name="name" placeholder="이름" maxLength={10} />
        <input
          type="tel"
          name="phone"
          className="inline-block"
          maxLength={11}
          placeholder="핸드폰번호"
          onChange={(e) => {
            setCheckPhone(() => /^(010)[0-9]{4}[0-9]{4}$/.test(e.target.value));
          }}
        />
        <br />
        <input
          type="text"
          name="content"
          className="inline-block"
          maxLength={100}
          placeholder="댓글"
        />
        <button className="border rounded-md">등록</button>
      </form>
      {line}
      <ul>
        {list
          .slice((page - 1) * 10, total < page * 10 ? total : page * 10)
          .map((v, i) => {
            return (
              <li key={i}>
                <div className="mb-2">
                  <span>{v.name} </span>
                  <span> ({v.phone.slice(7)})</span>
                  <span className="text-[#888888] text-sm">
                    {formatRelativeDate(v.date)}
                  </span>
                </div>
                <div className="text-wrap">{v.content}</div>
                {line}
              </li>
            );
          })}
        <li className="flex justify-center">
          <ul className="inline-flex -space-x-px text-base h-10">
            {paging.firstBottomNumber != 1 && (
              <li onClick={()=>setPage(()=>paging.firstBottomNumber - 1)}>
                previous
              </li>
            )}
            {pageList &&
              pageList.map((v, i) => (
                <li
                  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 cursor-pointer ${
                    page === i + paging.firstBottomNumber
                      ? " bg-[#7B62FF]  text-white"
                      : "bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  key={i + paging.firstBottomNumber}
                  onClick={(e) => setPage(() => i + paging.firstBottomNumber)}
                >
                  {i + paging.firstBottomNumber}
                </li>
              ))}
            {paging.lastBottomNumber != paging.totalPageSize && (
              <li onClick={()=>setPage(()=>paging.firstBottomNumber + 5)}>
                next
              </li>
            )}
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default Review;
