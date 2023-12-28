import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/home/Header'

function App() {
  return (
    <>
    <Header></Header>
    <Outlet />
    </>
    
  );
}

export default App;
