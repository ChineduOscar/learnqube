'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Eye, EyeOff, Mail, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logo from '../../assets/LearnQube.png';
import focused from '../../assets/focused.jpg';
import GoogleIcon from '../../assets/googleIcon';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center md:p-4 bg-gray-50">
      <div className="flex w-full max-w-5xl h-[780px]">
        {/* Signup Form Side */}
        <div className="flex-1">
          <Card className="w-full h-full shadow-lg rounded-r-none">
            <CardHeader className="space-y-6 pt-8">
              {/* Logo Section */}
              <div className="flex items-center justify-center">
                <Link href={'/'}>
                  <div className='flex items-center gap-4'>
                    <div>
                      <Image
                        src={logo}
                        alt='learnQube'
                        height={80}
                        width={80}
                        className="h-12 w-12"
                      />
                    </div>
                    <span className='font-bold text-2xl text-[#481895]'>LEARNQUBE</span>
                  </div>
                </Link>
              </div>
              
              <div className="space-y-1 pt-2">
                <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
                <p className="text-sm text-muted-foreground text-center">
                  Enter your details to start your learning journey
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                    <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-10"
                    required
                    />
                    <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-white bg-[#481895]"
                >
                  Sign up
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {/* Add Google signup logic */}}
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="hover:text-blue-700 text-[#481895]">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Image Side */}
        <div className="hidden lg:block flex-1 h-[780px]">
          <div className="h-full w-full relative rounded-r-lg overflow-hidden">
            <Image 
              src={focused} 
              alt='illustration'
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}