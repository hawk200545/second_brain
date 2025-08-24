import { Button } from "./Button"
import { Share } from "../../assets/share"
import { Plus } from "../../assets/plus"
export function Navbar(){
    return (
      <>
        <div className="flex items-center justify-between">
          <div className="text-lg  font-bold" >All Notes</div>
          <div className="flex gap-1">
            <Button
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<Share size={20} />}
            />
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<Plus size={20} />}
            />
          </div>
        </div>
      </>
    );
}