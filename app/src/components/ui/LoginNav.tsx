import brain from "../../assets/brain.svg"
import { Button } from "./Button"
interface navProps{
    type : "Signin" | "Signup"
}
export default function LoginNav(props: navProps){
    return (
      <>
        <div className="w-auto bg-violet-100 flex justify-between px-5 py-2">
          <a className="flex gap-3 items-center cursor-pointer">
            <img
              src={brain}
              className="size-6 text-violet-500"
              alt="second-brain"
            />
            <div className="text-lg font-bold text-violet-900">
              Second-Brain
            </div>
          </a>
          <a href={"/" + props.type}>
            <Button text={props.type} variant="primary" size="md" />
          </a>
        </div>
      </>
    );
}