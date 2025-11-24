import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Loading from "./components/Loading/Loading.tsx" 
import Navbar from "./components/Navbar/Navbar.tsx"; 
import Expense from "./pages/Expense/Expense.tsx";
const Home = lazy(() => import("./pages/Home/Home"));


const Login=lazy(()=>import("./pages/Login/Login.tsx"))


const Income=lazy(()=>import("./pages/Income/Income.tsx"))

const Register=lazy(()=>import("./pages/Register/Register.tsx"))

function App() {
  const navigate=useNavigate()


  useEffect(()=>{
const authenticated=!!localStorage.getItem('token')
if(authenticated){
navigate("/dashboard")
}
// else{
//   navigate("/login")
// }

  },[])
  return (
    <>
      <Suspense fallback={<Loading/> }>
        <Routes>
          <Route path="/" element={<Navbar/> }>
          
          <Route path='/login' element={<Login/>}></Route>
          
          <Route path='/income' element={<Income/>}></Route>
          
          <Route path='/sign-up' element={<Register/>}></Route>
          
          <Route path='/expense' element={<Expense/>}></Route>
          <Route path='/dashboard' element={<Home/>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
 