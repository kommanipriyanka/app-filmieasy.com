
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { LoginFormProps } from '@/lib/interfaces/Auth';
import FilmEasy from '@/components/Icons/Auth/FilmEasy';
import { useNavigate } from '@tanstack/react-router';
import MovieIcon from '../../Icons/Auth/MovieIcon';


function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword, 
  onLogin,
  onForgotPassword,
  onSignUp 
}:LoginFormProps){
  const navigate = useNavigate();
  return (
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className='flex text-center'>
             <FilmEasy />
          </div>  
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Complete production management platform for filmmakers. From script
            to screen, manage every aspect of your production.
          </p>
        </div>
        <Card className="backdrop-blur-md bg-white/10 border-white/20">
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
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                onClick={()=>navigate({ to: '/dashboard' })}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                size="lg"
              >
                Login
              </Button>

              <p className="text-center text-sm text-gray-300">
                New to Filmeasey?{' '}
                <button 
                  onClick={onSignUp}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Sign Up here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
        <MovieIcon />
      </div>
      
    </div>
  );
};

export default LoginForm;