import { Routes, Route } from "react-router-dom";
import { Header } from "./app/layout/Header";
import { Footer } from "./app/layout/Footer";
import Sidebar from "../src/app/layout/Sidebar/Sidebar";
import "../src/shared-components/styles/Login.scss";
import '../src/shared-components/styles/OrderList.scss';
import {
  AccessDenied,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MyOrders,
  NotFound,
  ProductItemDetails,
} from "./pages";
import { useEffect } from "react";
import { userModel } from "./types/interfaces";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./app/store/Redux/authSlice";
import "./shared-components/styles/App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { id, name, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ id, name, email, role }));
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__layout">
        <Sidebar />
        <main className="app__content pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/productItemDetails/:productItemId"
              element={<ProductItemDetails />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/accessDenied" element={<AccessDenied />} />
            <Route path="/authentication" element={<AuthenticationTest />} />
            <Route
              path="/authorization"
              element={<AuthenticationTestAdmin />}
            />
            <Route path="/order/myOrders" element={<MyOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
