import { useContext, useState } from "react";
import { Xmark } from "../assets/x-mark";
import Dropdown from "../components/ui/DropDown";
import { AppContext } from "../context/AppContext";
import TagsOpt from "../components/ui/TagsOpt";
export default function CreateModal() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const { setOpenModal } = context;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission
    console.log({ type, title, content });
    setOpenModal(false);
  };

  return (
    <>
      <div className="h-full w-full flex fixed inset-0 bg-black/50 backdrop-blur-xs">
        <div className="w-200 h-100 shadow-2xl flex-col rounded-2xl bg-white m-auto p-5">
          <div className="flex justify-between items-center">
            <Dropdown setTypes={setType} />
            {type}
            <button
              onClick={() => setOpenModal(false)}
              className="cursor-pointer rounded-md p-1 hover:bg-slate-100"
            >
              <Xmark size={30} />
            </button>
          </div>
          <div className="py-4">
            <div className="text-gray-700">Title</div>
            <input
              className="border-2 rounded-lg border-gray-300 hover:border-gray-400"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="py-4">
            <div className="text-gray-700">Content</div>
            <textarea
              className="border-2 rounded-lg border-gray-300 hover:border-gray-400"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <TagsOpt type="string"/>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
