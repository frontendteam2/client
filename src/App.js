import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/home/Header'
import Footer from './components/home/Footer';
function App() {
  return (
    <>
    <Header></Header>
    <Outlet />
    <Footer/>
    </>
  );
}

export default App;
