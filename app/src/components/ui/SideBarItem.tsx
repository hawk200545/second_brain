import type { ReactElement } from "react";

interface itemProps {
  title: string;
  icon: ReactElement;
}

export default function SideBarItem(props: itemProps){
    return (
      <>
        <div className="flex justify-between px-3 text  
        py-1 my-2 items-center hover:bg-violet-100  
        cursor-pointer rounded-md">
          {props.icon}
          {props.title}
        </div>
      </>
    );
}