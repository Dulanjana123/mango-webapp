import React from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
const logo = require("../../assets/images/mango.png")

interface LoginFormProps {
  userInput: { email: string; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ userInput, onChange, onSubmit, error }) => (
  <form className="login-form" onSubmit={onSubmit}>
    <img
    src={logo}
    alt="Mango Logo"
    className="login-form__logo"
    />
    <h1 className="login-form__title">Login</h1>
    <InputField
      type="text"
      placeholder="Enter Username"
      name="email"
      value={userInput.email}
      onChange={onChange}
    />
    <InputField
      type="password"
      placeholder="Enter Password"
      name="password"
      value={userInput.password}
      onChange={onChange}
    />
    {error && <p className="login-form__error">{error}</p>}
    <Button type="submit" label="Login" className="login-form__button" />
  </form>
);

export default LoginForm;
