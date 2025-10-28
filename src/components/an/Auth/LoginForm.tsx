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
import MovieIcon from "../../Icons/Auth/MovieIcon";
import Violet from "@/components/Icons/Auth/violet";
import Pink from "@/components/Icons/Auth/pink";
import Green from "@/components/Icons/Auth/green";
import Brow from "@/components/Icons/Auth/brow";

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
}: LoginFormProps) {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center gap-2 top-[-50px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%]"
          style={{ opacity: 0.4 }}
        >
          <Violet />
        </div>

        <div
          className="absolute bottom-[-10%] left-[-5%] w-full h-full"
          style={{ opacity: 0.35 }}
        >
          <Green />
        </div>

        <div
          className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%]"
          style={{ opacity: 0.2 }}
        >
          <Brow />
        </div>
      </div>

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
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: johnwesly@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10 focus:bg-white/15 focus:border-white/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={onForgotPassword}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Forgot Password ?
                </button>
              </div>
              <Button
                onClick={() => navigate({ to: "/dashboard" })}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                size="lg"
              >
                Login
              </Button>

              <p className="text-center text-sm text-gray-300">
                New to Filmeasey?{" "}
                <button
                  onClick={onSignUp}
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                >
                  Sign Up here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center pointer-events-none z-10">
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 max-h-32 sm:max-h-40 md:max-h-48">
          <MovieIcon />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
