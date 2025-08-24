import { Navbar } from "./navBar"
import HomeContents from "./HomeContents";
export default function AllNotes(){
    return (
      <>
        <div className="w-full bg-violet-50">
          <div className="mx-7 my-5">
            <Navbar />
            <br />
            <HomeContents/>
          </div>
        </div>
      </>
    );
}