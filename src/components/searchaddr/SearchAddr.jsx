import { useEffect,useRef,useState } from "react";
import Map from "./Map";

export default function SearchAddr() {
  const inputSearch = useRef(null);
  const inputSubSearch = useRef(null);

  const [search,setSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [watch, setWatch] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(() => inputSearch.current.value)
    setSubSearch(() => inputSubSearch.current.value)
  }

  const handleClick = () => {
    setWatch(true);
  }

  const handleClose = () => {
    setWatch(false);
  }

  const handleChangeAddr = (e) => {
    setSubSearch(e.target.value)
  }

  const handleCheck = () => {
    setReadOnly(true)
    setWatch(false)
    setSubSearch(() => inputSubSearch.current.value)

    console.log(subSearch);
  }
  

  return (
    <>
      <div className="text-sm mt-10 font-bold">
        <div className="text-sm mt-12 text-stone-500 font-semibold block">주소 찾기</div>
        <form onSubmit={handleSubmit} className="border-1">
          <input 
            type="text" 
            name="search" 
            ref={inputSearch} 
            className="rounded-xl text-sm py-4 block bg-stone-100 px-2 mt-5"
            placeholder="키워드를 입력해주세요"
            autocomplete="off"
            readOnly={readOnly}
            onClick={handleClick}
          />
          <input 
            type="text" 
            ref={inputSubSearch} 
            name="subSearch" 
            className="rounded-xl text-sm py-4 block bg-stone-100 mt-3 px-2" 
            placeholder="상세 주소"
            readOnly={readOnly}
            onChange={handleChangeAddr}
          />
          <button></button>
          <button className="mt-3 p-3 bg-stone-100 border-slate-600" onClick={handleCheck}>장소 확정</button>
        </form>
        { watch &&
          <>
            <div className="relative text-sm block flex-1 bg-white mt-5 border-1 border-gray-800">
              { closeBtn &&
                <img src="https://t1.daumcdn.net/postcode/resource/images/close.png" className="absolute top-0 right-0 cursor-pointer z-10 w-6" onClick={handleClose}/>
              }
              <Map // 로드뷰를 표시할 Container
                search={search}
                subSearch={subSearch}
                className="text-sm block flex-1 bg-white mt-4 border-2 border-black"
              >
              </Map> 
            </div>
          </>
        }
      </div>
    </>
  )
}