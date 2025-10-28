export interface  LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  emailError: string;
  setemailError: (emailError: string) => void;
  passwordError: string;
  setpasswordError: (passwordError: string) => void;
}

export interface UserDetails {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  created_at: string | null;
  updated_at: string | null;
}
export interface Login {
  email: string;
  password: string;
}


export interface LoginResponseData {
  userDetails: UserDetails;
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface SignupFormProps {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSignup: () => void;
  onLogin: () => void;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface SignupResponse {
  status: number;
  success: boolean;
  message: string;
  data: User;
}