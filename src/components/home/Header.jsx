import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate()

  return (
    <header className="max-sm:hidden p-5">
    <nav className="cursor-pointer flex items-center font-['JalnanGothic'] text-1xl" onClick={()=>{navigate('/')}}> <span>여기서 만나요</span> <img src="./logo.png" alt=""/></nav>  
    </header>
  );
}
