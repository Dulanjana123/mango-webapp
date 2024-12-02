import React, { useState } from 'react'
import inputHelper from '../Helper/inputHelper';
import { apiResponse, userModel } from '../types/interfaces';
import { useLoginUserMutation } from '../app/services/api/authService';
import  jwt_decode  from "jwt-decode";
import {useDispatch} from "react-redux";
import { setLoggedInUser } from '../app/store/Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../app/layout/Page/ProductItems/Common';


function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const[loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      email: userInput.email,
      password: userInput.password,
    });
    if(response.data) {
      console.log(response.data);
      const {token} = response.data.result;
      const {id,name,email,role} : userModel = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({id,name,email,role}));
      navigate("/");
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0]);
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
    console.log("Test");
  }


  return (  
    <div className="container text-center">
      {loading && <MainLoader/>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>
    
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>
    
        <div className="mt-2">
          {error && <p className='text-danger'>{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>)
}

export default Login