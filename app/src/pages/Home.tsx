import SideBar from "../components/ui/SideBar";
import AllNotes from "../components/ui/AllNotes";

export default function Home() {
  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <AllNotes />
      </div>
    </>
  );
}
