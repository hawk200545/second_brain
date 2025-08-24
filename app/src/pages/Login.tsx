import { Button } from "../components/ui/Button";
import LoginNav from "../components/ui/LoginNav";
export default function Login() {
  return (
    <>
      <LoginNav type="signup" />
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
            <div className="flex flex-col gap-3 bg-violet-300 min-w-[150px] p-5 rounded-md shadow-lg">
              <div>Username</div>
              <input
                type="text"
                className="border-2 border-violet-900 rounded-md py-1 px-2"
              />
              <div>Password</div>
              <input
                type="text"
                className="border-2 border-violet-900 rounded-md py-1 px-2"
              />
              <div className="text-sm">
                Don't have an account?
                <a className="text-violet-600 underline" href="/signup">
                  Signup
                </a>
              </div>
              <Button text="Submit" variant="primary" size="md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
