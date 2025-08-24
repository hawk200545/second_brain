import type { ReactElement } from "react";
import { Share } from "../../assets/share";
import { Trash } from "../../assets/trash";
interface TopProps{
    startIcon : ReactElement,
    title : string
}
export default function CardTop(props: TopProps){
    return (
      <>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            {props.startIcon} {props.title}
          </div>
          <div className="flex gap-2">
            <button className="cursor-pointer">
              <Share size={20} />
            </button>
            <button className="cursor-pointer">
              <Trash size={20} />
            </button>
          </div>
        </div>
      </>
    );
}