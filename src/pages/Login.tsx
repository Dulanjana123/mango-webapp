import React, { useState } from 'react';
import { useLoginUserMutation } from '../app/services/api/authService';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../app/store/Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LoginForm from '../../src/shared-components/molecules/LoginForm';
import Loader from '../../src/shared-components/atoms/Order/Loader';
import { apiResponse, userModel } from '../types/interfaces';
//import "../../src/shared-components/styles/Login.scss";


const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await loginUser({ email: userInput.email, password: userInput.password });
    if (response.data) {
      const { token } = response.data.result;
      const { id, name, email, role } : userModel = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ id, name, email, role }));
      navigate("/");
    } else if (response.error) {
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };

  return (
    <div className="login-section">
      {loading && <Loader />}
      <LoginForm userInput={userInput} onChange={handleUserInput} onSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default Login;
