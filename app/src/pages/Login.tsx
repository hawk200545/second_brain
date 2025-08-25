import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import LoginNav from "../components/ui/LoginNav";
import { usernmaeSchema, passwordSchema } from "../schemas/userSchema";
import useDebounce from "../hooks/useDebounce";
import { toast } from "sonner";
import { VERCEL_URL } from "../../config";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 200);
  const [password, setPassword] = useState("");
  const debouncedPass = useDebounce(password, 200);
  const [validEmail, setValidEmail] = useState("");
  const [validPass, setValidPass] = useState("");

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const response = usernmaeSchema.safeParse(debouncedEmail);
    setValidEmail(
      response.success || debouncedEmail == ""
        ? ""
        : response.error.issues[0].message
    );
  }, [debouncedEmail]);

  useEffect(() => {
    const response = passwordSchema.safeParse(debouncedPass);
    setValidPass(
      response.success || debouncedPass == ""
        ? ""
        : response.error.issues[0].message
    );
  }, [debouncedPass]);

  async function submitEvent() {
    if (validEmail || validPass) {
      toast.warning("Please fix the error before Submit");
      return;
    } else {
      try {
        const response = await axios.post(
          VERCEL_URL+"api/v1/signin",
          {
            username: debouncedEmail,
            password: debouncedPass,
          }
        );
        
        toast.success(response.data.message);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Internal Error");
          }
        }
      }
    }
  }

  return (
    <>
      <LoginNav type="Signup" />
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
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={email}
                onChange={emailChange}
                placeholder="user_name"
                className="border-2 border-violet-900 rounded-md py-1 px-2"
              />
              <div className="text-red-700 text-xs text-right">
                {validEmail}
              </div>
              <label htmlFor="password" className="font-medium">
                Password
              </label>
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
                Don't have an account?
                <a className="text-violet-600 underline" href="/signup">
                  Signup
                </a>
              </div>
              <Button
                text="Submit"
                onclick={submitEvent}
                variant="primary"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
