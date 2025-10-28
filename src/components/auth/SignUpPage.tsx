import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { userSignupApi } from "@/http/services/auth";
import { SignupResponse } from "@/lib/interfaces/Auth";
import SignupForm from "../an/Auth/SignUpForm";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (details: { full_name: string; email: string; phone: string; password: string }) => {
      const response = await userSignupApi(details);
      if (!response.success) {
        throw response;
      }
      return response;
    },
    onSuccess: (response: SignupResponse) => {
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      setFullNameError(error.data.errData?.full_name || "");
      setEmailError(error.data.errData?.email || "");
      setPhoneError(error.data.errData?.phone || "");
      setPasswordError(error.data.errData?.password || "");
      setConfirmPasswordError("");
    },
  });

  const handleSignup = () => {
    setFullNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    mutation.mutate({ full_name: fullName.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password });
  };

  const handleLogin = () => {
    navigate({ to: "/" });
  };

  const handleFullNameChange = (value: string) => setFullName(value);
  const handleEmailChange = (value: string) => setEmail(value);
  const handlePhoneChange = (value: string) => setPhone(value);
  const handlePasswordChange = (value: string) => setPassword(value);
  const handleConfirmPasswordChange = (value: string) => setConfirmPassword(value);

  return (
    <SignupForm
      fullName={fullName}
      email={email}
      phone={phone}
      password={password}
      confirmPassword={confirmPassword}
      fullNameError={fullNameError}
      setFullNameError={setFullNameError}
      emailError={emailError}
      setEmailError={setEmailError}
      phoneError={phoneError}
      setPhoneError={setPhoneError}
      passwordError={passwordError}
      setPasswordError={setPasswordError}
      confirmPasswordError={confirmPasswordError}
      setConfirmPasswordError={setConfirmPasswordError}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      onFullNameChange={handleFullNameChange}
      onEmailChange={handleEmailChange}
      onPhoneChange={handlePhoneChange}
      onPasswordChange={handlePasswordChange}
      onConfirmPasswordChange={handleConfirmPasswordChange}
      onSignup={handleSignup}
      onLogin={handleLogin}
      isLoading={mutation.isPending}
    />
  );
}