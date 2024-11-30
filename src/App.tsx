import { Routes, Route } from "react-router-dom";
import { Footer } from "./app/layout/Footer";
import { Header } from "./app/layout/Header";
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MyOrders, NotFound, ProductItemDetails } from "./pages";
import { useEffect } from "react";
import { userModel } from "./types/interfaces";
import  jwt_decode  from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./app/store/Redux/authSlice";


function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    const localToken = localStorage.getItem("token");
    if(localToken){
      const {id, name, email, role} : userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({id,name,email,role}));
    }
  }, [])

  return (
    <div>
      <Header/>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/productItemDetails/:productItemId" element={<ProductItemDetails/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/accessDenied" element={<AccessDenied/>}></Route>
          <Route path="/authentication" element={<AuthenticationTest/>}></Route>
          <Route path="/authorization" element={<AuthenticationTestAdmin/>}></Route>
          <Route path="/order/myOrders" element={<MyOrders/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
