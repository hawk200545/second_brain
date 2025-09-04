import { Button } from "../components/ui/Button";
import LoginNav from "../components/ui/LoginNav";
import { useState, useEffect } from "react";
import { VERCEL_URL } from "../../config";
import {toast} from "sonner";
import { usernmaeSchema, passwordSchema } from "../schemas/userSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
export default function Signup() {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const debouncedEmail = useDebounce(email,200);
    const [Ucolor,setUcolor] = useState("red");
    const [password,setPassword] = useState("");
    const debouncedPass = useDebounce(password,200);
    const [validEmail,setValidEmail] = useState("");
    const [validPass,setValidPass] = useState("");
  
  
    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
    const passChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    async function UsernameMatch(debouncedEmail: string) {
      try {
        const matchResponse = await axios.post(
          VERCEL_URL+"api/v1/match",
          {
            username: debouncedEmail,
          }
        );
        if (matchResponse.status === 200) {
          setUcolor("green");
        } else if (matchResponse.status === 201) {
          setUcolor("red");
        }
        setValidEmail(matchResponse.data.message);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setValidEmail("");
        }
      }
    }
    
    useEffect(()=>{
      const response = usernmaeSchema.safeParse(debouncedEmail);
      if(debouncedEmail == ""){
        setValidEmail("");
      }
      else if(response.success){
        UsernameMatch(debouncedEmail);
      }else{
        setUcolor("red")
        setValidEmail(response.error.issues[0].message);
      }
    },[debouncedEmail]);
  
    useEffect(() => {
      const response = passwordSchema.safeParse(debouncedPass);
      setValidPass(response.success || debouncedPass == "" ? "" : response.error.issues[0].message);
    }, [debouncedPass]);
  
    async function submitEvent() {
      if (validEmail != "username available" || validPass) {
        toast.warning("Please fix the error before Submit");
        return;
      }
      
      const promise = () => new Promise((resolve, reject) => {
        axios.post(VERCEL_URL + "api/v1/signup", {
          username: debouncedEmail,
          password: debouncedPass,
        })
        .then(response => {
          resolve(response.data);
          toast.info("You will be redirected to login Page in 3 seconds");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch(error => {
          if (axios.isAxiosError(error) && error.response) {
            reject(error.response.data.message);
          } else {
            reject("An unexpected error occurred.");
          }
        });
      });
  
      toast.promise(promise(), {
        loading: 'Creating account...',
        success: (data: any) => `${data.message}`,
        error: (message) => `${message}`,
      });
    }
    return (
      <>
        <LoginNav type="Signin" />
        <div className="flex h-screen bg-violet-50">
          <div className="flex flex-col mt-30 mx-auto">
            {/* Nav */}
            {/* Hero and Signup form */}
            <div className="flex items-center gap-x-36 justify-between">
              <div className="max-w-[500px]">
                <div className="text-6xl font-black text-violet-900 mb-3">
                  Welcome to Second-Brain
                </div>
                <div className="text text-violet-700 font-normal">
                  A digital system that captures, organizes, and retrieves
                  knowledge, ideas, and tasks to enhance clarity and creativity.
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-violet-300 min-w-[150px] p-5 rounded-md shadow-lg">
                <label htmlFor="username" className="font-medium">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={email}
                  onChange={emailChange}
                  placeholder="user_name"
                  className="border-2 border-violet-900 rounded-md py-1 px-2"
                />
                <div className={`${Ucolor === "red" ? "text-red-700" : "text-green-700"} text-xs text-right`}>
                  {validEmail}
                </div>
                <label htmlFor="password" className="font-medium">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={passChange}
                  placeholder="password@123"
                  className="border-2 border-violet-900 rounded-md py-1 px-2"
                />
                <div className="text-red-700 text-xs text-right max-w-[300px]">
                  {validPass}
                </div>
                <div className="text-sm">
                  Have an account?
                  <a className="text-violet-600 underline" href="/signin">
                    Login
                  </a>
                </div>
                <Button text="Submit" onClick={submitEvent} variant="primary" size="md" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
