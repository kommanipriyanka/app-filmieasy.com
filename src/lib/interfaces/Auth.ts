export interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}