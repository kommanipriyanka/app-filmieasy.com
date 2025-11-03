import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormProps } from "@/lib/interfaces/Auth";
import FilmEasy from "@/components/Icons/Auth/FilmEasy";
import { useNavigate } from "@tanstack/react-router";
import loginBg from "@/assets/login-bg.webp"; 
function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onLogin,
  onForgotPassword,
  onSignUp,
  emailError,
  setemailError,
  passwordError,
  setpasswordError,
}: LoginFormProps) {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center gap-2 overflow-hidden">
      <img
        src={loginBg} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="w-full max-w-sm space-y-4 relative z-20">
        <div className="text-center space-y-1">
          <div className="flex justify-center w-full">
            <div className="">
              <FilmEasy />
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-300 max-w-xs sm:max-w-sm mx-auto px-2">
            Complete production management platform for filmmakers. From script
            to screen, manage every aspect of your production.
          </p>
        </div>
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription className="text-gray-300">
              Greetings! Kindly enter your credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setemailError("");
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 transition-all"
                />
                {emailError && (
                  <p className="text-red-500 text-xs">{emailError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password{" "}
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setpasswordError("");
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 focus:bg-white/15 focus:border-white/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white "
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs">{passwordError}</p>
                )}
              </div>
              <div className="text-right">
                <button
                  onClick={onForgotPassword}
                  className="text-sm text-gray-300 hover:text-white  cursor-pointer"
                >
                  Forgot Password ?
                </button>
              </div>
              <Button
                onClick={onLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white  cursor-pointer"
                size="lg"
              >
                Login
              </Button>
              <p className="text-center text-sm text-gray-300">
                New to Filmeasey?{" "}
                <button
                  onClick={() => navigate({ to: "/signup" })}
                  className="text-orange-400 hover:text-orange-300  font-medium cursor-pointer"
                >
                  Sign Up here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
