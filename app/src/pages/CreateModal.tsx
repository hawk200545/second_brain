import { useEffect, useState } from "react";
import { Xmark } from "../assets/x-mark";
import Dropdown from "../components/ui/DropDown";
import TagsOpt from "../components/ui/TagsOpt";
import FileUpload from "../components/ui/FileUpload";
import { useDispatch } from "react-redux";
import { toggleModal } from "../redux/modalSlice";
import { clearTags } from "../redux/tagsSlice";
import { Button } from "../components/ui/Button";
import { VERCEL_URL } from '../../config'
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { toast } from "sonner";
import axios from "axios";

export default function CreateModal() {

  const token = useSelector((state: RootState)=>state.token);
  const tags = useSelector((state: RootState)=>state.tags);
  const dispatch = useDispatch();

  const [type, setType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const onClose = () => {
    dispatch(clearTags());
    dispatch(toggleModal());
  };

  useEffect(()=>{
    dispatch(clearTags());
  },[type]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setDescription(e.target.value);
  }
  const handelChangeLink = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setLink(e.target.value);
  }
  const handleChangeSubTitle = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSubTitle(e.target.value);
  }

 const handleSubmit = () => {
    if(type === "Tweet"){
      if(!title || !subTitle || !description){
        toast.error("Please fill all the fields");
        return;
      }
    }
    else if(type === "Video"){
      if(!title || !link){
        toast.error("Please fill all the fields");
        return;
      }
    }
   const newContent = {
     title,
     type,
     link,
     body: {
       title: subTitle,
       paragraph: description,
     },
     tags,
   };

   try {
     const promise = () =>
       new Promise<ApiResponse>((resolve, reject) => {
         axios
           .post<ApiResponse>(VERCEL_URL + "api/v1/content", newContent, {
             headers: { Authorization: token },
           })
           .then((response) => {
            dispatch(clearTags());
            dispatch(toggleModal());
            resolve(response.data); // return only data
           })
           .catch((error) => {
             if (axios.isAxiosError(error) && error.response) {
               reject(error.response.data.message);
             } else {
               reject("An unexpected error occurred.");
             }
           });
       });

     toast.promise<ApiResponse>(promise(), {
       loading: "Submitting...",
       success: (data) => `${data.message}`, // expects string
       error: (message) => `${message}`,
     });
   } catch (error) {
     console.log(error);
   }

   interface ApiResponse {
     message: string;
   }
 };


  return (
    <>
      <div className="h-full w-full flex fixed inset-0 bg-black/50 backdrop-blur-xs">
        <div className="w-150 h-auto shadow-2xl flex-col rounded-2xl bg-white m-auto p-5">
          <div className="flex justify-between items-center">
            <Dropdown setTypes={setType} />
            {type}
            <button
              onClick={onClose}
              className="cursor-pointer rounded-md p-1 hover:bg-slate-100"
            >
              <Xmark size={30} />
            </button>
          </div>
          {!type && (
            <div className="text-center text-gray-500 m-10">
              Please select a content type to proceed
            </div>
          )}
          {/* Title section */}
          {type && (
            <div className="py-2 mt-2 flex items-center gap-5">
              <div className="text-gray-700">Title</div>
              <input
                className="border-2 rounded-lg w-full border-gray-300 hover:border-gray-400 py-1 px-2"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          )}
          {type === "Tweet" && (
            <div className="py-2 flex items-center gap-5">
              <div className="text-gray-700 whitespace-nowrap">Sub-Title</div>
              <input
                className="border-2 rounded-lg w-full border-gray-300 hover:border-gray-400 py-1 px-2"
                type="text"
                value={subTitle}
                onChange={handleChangeSubTitle}
              />
            </div>
          )}
          {type === "Tweet" && (
            <div className="py-1 flex items-center gap-5">
              <div className="text-gray-700">Paragraph</div>
              <textarea
                className="border-2 rounded-lg w-full max-h-20
                 border-gray-300 text-sm hover:border-gray-400 py-1 px-2"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          )}
          {type && (
            <div className="flex justify-between items-center gap-5">
              <div className="text-gray-700 mb-2">Tags</div>
              <TagsOpt />
            </div>
          )}
          {type == "Document" && <FileUpload title={title} />}
          {/* Link section */}
          {type === "Video" && (
            <div className="py-4 flex items-center gap-5">
              <div className="text-gray-700">Link</div>
              <input
                className="border-2 rounded-lg w-full border-gray-300 hover:border-gray-400 py-1 px-2"
                type="text"
                value={link}
                onChange={handelChangeLink}
              />
            </div>
          )}

          {/* Button */}
          {(type !== "Document" && type)  && (
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="md"
                text="Submit"
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
