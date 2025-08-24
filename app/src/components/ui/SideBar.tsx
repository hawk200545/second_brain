import brain from "../../assets/brain.svg"
import SideBarItem from "./SideBarItem"
import { Twitter } from "../../assets/twitter"
import { Document } from "../../assets/document";
import { Links } from "../../assets/link";
import { Hash } from "../../assets/hash";
export default function SideBar(){
    return (
      <>
        <div className="w-[370px] h-screen bg-violet-200 ">
          <div className="mx-3 my-5">
            <a className="flex justify-between px-3 text-lg my-4 
            font-medium items-center cursor-pointer" href="/">
              <img src={brain} className="size-6" alt="second-brain" />
              <span>Second Brain</span>
            </a>
            <SideBarItem icon={<Twitter size={30} />} title="Tweet" />
            <SideBarItem icon={<Document size={30} />} title="Document" />
            <SideBarItem icon={<Links size={30} />} title="Links" />
            <SideBarItem icon={<Hash size={30} />} title="Tags" />
          </div>
        </div>
      </>
    );
}