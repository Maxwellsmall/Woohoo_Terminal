import { Outlet } from 'react-router-dom';
import Header from "../static/Header"
import Footer from "../static/Footer"

const Staticlayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}

export default Staticlayout