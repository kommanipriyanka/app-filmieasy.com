import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import LoginForm from "../an/Auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { userLoginApi } from "@/http/services/auth";
import { LoginResponse } from "@/lib/interfaces/Auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (details: { email: string | null; password: string | null }) =>
      userLoginApi(details),
    onSuccess: (response: LoginResponse) => {
      const { access_token, refresh_token } = response.data;
      Cookies.set("access_token", access_token);
      Cookies.set("refresh_token", refresh_token);
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      const errData = error.data?.errData;
      const msg = error.data?.message?.toLowerCase() || "";

      setemailError("");
      setPasswordError("");

      if (errData) {
        setemailError(errData.email || "");
        setPasswordError(errData.password || "");
      } else if (msg.includes("email")) {
        setemailError(error.data.message);
      } else if (msg.includes("password")) {
        setPasswordError(error.data.message);
      } else if (msg) {
        setPasswordError(error.data.message);
      }
    },
  });

  const handleLogin = () => {
    const payload: { email: string | null; password: string | null } = {
      email: email.trim() !== "" ? email : null,
      password: password.trim() !== "" ? password : null,
    };
    mutation.mutate(payload);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
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
      emailError={emailError}
      setemailError={setemailError}
      passwordError={passwordError}
      setpasswordError={setPasswordError}
    />
  );
}
