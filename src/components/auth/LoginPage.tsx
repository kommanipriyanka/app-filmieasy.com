import { useState } from "react";
import LoginForm from "../an/Auth/LoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt:', { email, password });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');

  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
    />
  );
}