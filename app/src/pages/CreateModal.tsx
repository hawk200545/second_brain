import { useContext, useState } from "react";
import { Xmark } from "../assets/x-mark";
import Dropdown from "../components/ui/DropDown";
import { AppContext } from "../context/AppContext";
export default function CreateModal() {
  const [Types, setTypes] = useState("");
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const { setOpenModal } = context;
  return (
    <>
      <div className="h-full w-full flex fixed inset-0 bg-black/50 backdrop-blur-xs">
        <div className="w-200 h-100 shadow-2xl flex-col rounded-2xl bg-white m-auto p-5">
          <div className="flex justify-between items-center">
            <Dropdown setTypes={setTypes} />
            {Types}
            <button
              onClick={() => setOpenModal(false)}
              className="cursor-pointer rounded-md p-1 hover:bg-slate-100"
            >
              <Xmark size={30} />
            </button> 
          </div>
            <div className="text-gray-700">Title</div>
            <input className="border-2 rounded-lg border-gray-300 hover:border-gray-400" type="text" />
        </div>
      </div>
    </>
  );
}
