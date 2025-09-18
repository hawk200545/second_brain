import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { VERCEL_URL } from "../../../config";
import { Button } from "./Button";
import {toast} from "sonner";
type UploadStatus = "idle" | "uploading" | "success" | "error";
import { type RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { toggleModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import { clearTags } from "../../redux/tagsSlice";
interface fileProps{
  title : string;
}

export default function FileUpload(porps: fileProps) {

  const dispatch = useDispatch();
  const token = useSelector((state: RootState)=> state.token);
  const tags = useSelector((state: RootState)=>state.tags);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setuploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }
  async function fileUpload() {
    if (!files){
      toast.error("Please select files before uploading");
      return;
    };
    setStatus('uploading');
    setuploadProgress(0);
    const formData = new FormData();
    files.forEach((file)=>{
        formData.append('files', file);
    })
    formData.append("title",porps.title);
    formData.append("tags", JSON.stringify(tags));

    try{
        const promise = ()=> new Promise((resolve,reject)=>{
            // axios.post(`${VERCEL_URL}upload`, formData, {
            axios
              .post( VERCEL_URL + "api/v1/content/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: token,
                },
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                  );
                  setuploadProgress(percentCompleted);
                },
              })
              .then((response) => {
                resolve(response);
                dispatch(clearTags());
                dispatch(toggleModal());
                setStatus("success");
              })
              .catch((error) => {
                reject(error);
                setStatus("error");
              });
        })
        toast.promise( promise(), {
            loading : "Uploading...",
            success : ()=> `File uploaded successfully`,
            error : ()=> `Error in Uploading File`
        }

        )
    }catch(error){
        setStatus('error');
        console.log(error);
    }
  }

  return (
    <div className="">
      <input
        type="file"
        className="text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
        onChange={handleFileChange}
        multiple
      />
      {files.length > 0 && (
        <div className="truncate max-w-max text-sm font-light">
          {files.map((file) => file.name).join(", ")}
        </div>
      )}
      <div className="mt-2 w-full flex justify-end">
        {status != "uploading" && (
          <Button
            variant="primary"
            size="md"
            text="Submit"
            onClick={fileUpload}
          />
        )}
      </div>
      {status == "uploading" && <div>Progress : {uploadProgress}</div>}
    </div>
  );
}
