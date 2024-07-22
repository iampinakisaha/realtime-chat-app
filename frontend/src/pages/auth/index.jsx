import Victory from "@/assets/victory.svg";
import loginImage from "@/assets/login2.png"; // Import the image
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/api-client.js";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
const Auth = () => {
  const navigate = useNavigate();
  const {userInfo} = useAppStore();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const validateSignup = () => {
    const emailPattern = new RegExp(import.meta.env.VITE_EMAIL_PATTERN);
    const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORD_PATTERN);
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid Email.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      toast.error("Please enter valid Password.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };

  const validateSignin = () => {
    const emailPattern = new RegExp(import.meta.env.VITE_EMAIL_PATTERN);
    const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORD_PATTERN);
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid Email.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      toast.error("Please enter valid Password.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateSignin()) {
      try {
        const response = await apiClient.post(
          SIGNIN_ROUTE,
          { email, password },
          { withCredentials: true },
        );
  
        if (response.data?.id) {
          
          setUserInfo(response.data);
  
         
          
          if (response.data.profileSetup) {
            
            navigate("/chat");
          } else {
            
            navigate("/profile");
          }
        } else {
         
          toast.error("Login failed. Please check your credentials.");
        }
  
      } catch (error) {
       
        toast.error("Failed to login. Please try again later.");
      }
    }
  };
  

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true },
      );
      toast.success("Signup successfully. Please login now to continue");
      
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 overflow-y-scroll scroolbar-none">
        <div className="flex flex-col gap-10 items-center justify-center ">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <Tabs className="w-3/4 h-full" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10 " value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                className="flex flex-col gap-5 overflow-y-auto h-full"
                value="signup"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={loginImage} alt="background login" className="h-[700px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
