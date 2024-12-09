import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userModel } from "../../../types/interfaces";
import { RootState } from "../../store/Redux/store";
import { emptyUserState, setLoggedInUser } from "../../store/Redux/authSlice";
import "../../../shared-components/styles/Header.scss";
import { Button } from '../../../shared-components/atoms';

const logo = require("../../../assets/images/mango.png");

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
        
        <Button type="button" label="Codice" className="app-name"/>
        
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <div className="d-flex ms-auto">
              {userData.id ? (
                <>
                  <li className="nav-item">
                    <Button type="button" label={`Welcome,  ${userData.name}`} className="welcome-message"/>
                  </li>
                  <li className="nav-item">
                    <Button type="submit" label="Logout" className="btn btn-logout mx-2"  onClick={handleLogout}/>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="btn btn-login mx-2" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
