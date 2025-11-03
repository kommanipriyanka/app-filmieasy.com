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
import { SignupFormProps } from "@/lib/interfaces/Auth";
import FilmEasy from "@/components/Icons/Auth/FilmEasy";
import loginBg from "@/assets/login-bg.webp"; 

function SignupForm({
  fullName,
  email,
  phone,
  password,
  confirmPassword,
  fullNameError,
  setFullNameError,
  emailError,
  setEmailError,
  phoneError,
  setPhoneError,
  passwordError,
  setPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSignup,
  onLogin,
  isLoading,
}: SignupFormProps) {
  return (
    <div className="relative h-screen flex items-center justify-center gap-2 overflow-hidden">
      <img
        src={loginBg} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="w-full max-w-md space-y-4 relative z-20">
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
            <CardTitle className="text-2xl text-white">Sign Up</CardTitle>
            <CardDescription className="text-gray-300">
              Create your account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => {
                    onFullNameChange(e.target.value);
                    if (fullNameError) setFullNameError("");
                  }}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 transition-all"
                />
                {fullNameError && (
                  <p className="text-red-500 text-xs">{fullNameError}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                    <span className="text-(--an-card-error-color)"> *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      onEmailChange(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 transition-all"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs">{emailError}</p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                    <span className="text-(--an-card-error-color)"> *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        onPhoneChange(value);
                        if (phoneError) setPhoneError("");
                      }
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 transition-all"
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs">{phoneError}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      onPasswordChange(e.target.value);
                      if (passwordError) setPasswordError("");
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      onConfirmPasswordChange(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError("");
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 focus:bg-white/15 focus:border-white/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white "
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-xs">{confirmPasswordError}</p>
                )}
              </div>
              <Button
                onClick={onSignup}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white  cursor-pointer disabled:opacity-50"
                size="lg"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
              <p className="text-center text-sm text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={onLogin}
                  className="text-orange-400 hover:text-orange-300  font-medium cursor-pointer"
                >
                  Login here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignupForm;