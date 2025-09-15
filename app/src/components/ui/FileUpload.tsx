import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { VERCEL_URL } from "../../../config";
import { Button } from "./Button";
import {toast} from "sonner";
type UploadStatus = "idle" | "uploading" | "success" | "error";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function FileUpload() {

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext must be used within a AppProvider");
  }
  const {token} = context;
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
    const tags = ["react", "node", "cloud"];
    formData.append("tags", JSON.stringify(tags));
    formData.append("title","File upload Test");

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
                setStatus("success");
              })
              .catch((error) => {
                reject(error);
                setStatus("error");
              });
        })
        toast.promise( promise(), {
            loading : "Uploading...",
            success : (response : any)=> `${response.data.message}`,
            error : ()=> `Error in Uploading File`
        }

        )
    }catch(error){
        setStatus('error');
        console.log(error);
    }
  }

  return (
    <div>
      {/* <input className="block w-full text-sm text-gray-900 border
     border-gray-300 rounded-lg cursor-pointer 
     bg-gray-50 dark:text-gray-400 focus:outline-none
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/> */}
      {/* <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground 
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
    disabled:opacity-50" id="picture" name="picture" type="file"/> */}
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
        <div className="max-h-20 overflow-scroll">
          {files.map((file, index) => (
            <div key={index} className="my-2 text-sm">
              <p>
                File {index + 1}: {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
      {status != "uploading" && (
        <Button
          variant="secondary"
          size="md"
          text="Sumbit"
          onClick={fileUpload}
        />
      )}
      {status == "uploading" && <div>Progress : {uploadProgress}</div>}
    </div>
  );
}
