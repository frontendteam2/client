import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate()

  return (
    <header className="max-sm:hidden bg-slate-300">
    <nav className="cursor-pointer" onClick={()=>{navigate('/')}}>aaaaa</nav>  
    </header>
  );
}
