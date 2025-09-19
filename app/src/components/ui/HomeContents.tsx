import Card from "./Card";
import CreateModal from "../../pages/CreateModal";
import { useSelector } from "react-redux";
import {type RootState} from '../../redux/store';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearTags } from "../../redux/tagsSlice";
import { useEffect } from "react";
import * as z from "zod";
import axios from "axios";
import { VERCEL_URL } from "../../../config";

const contentSchemaDef = {
  type: z.enum(["Tweet", "Document", "Video"]),
  link: z.string().optional(),
  title: z.string().min(1, { message: "Title cannot be empty" }),
  tags: z.array(z.string()).optional(),
  body: z
    .object({
      title: z.string().optional(),
      paragraph: z.string().optional(),
    })
    .optional(),
  files: z.array(z.instanceof(File)).optional(),
};
type Content = z.infer<z.ZodObject<typeof contentSchemaDef>>;

export default function HomeContents() {
  const [error, setError] = useState("");
  const [contents, setContents] = useState<Array<Content>>([]);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const openModal = useSelector((state: RootState)=> state.modal);
  useEffect(()=>{
    dispatch(clearTags());
  },[dispatch, openModal]);
  
  async function fetchData() {
      await axios.get(VERCEL_URL+"api/v1/content",{
        headers :{
          Authorization: token,
        }
      }).then((response)=>{
        console.log(response.data.content)
        setContents(response.data.content);
        setError("");
      }).catch((error)=>{
        console.log(error);
      });
  }

  useEffect(()=>{
    fetchData();
  },[openModal]);
  
  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {openModal && <CreateModal />}

      <div className="grid justify-items-stretch grid-cols-3 gap-5">
        {contents.map((content, index) => {
          if (content.type === "Document") {
            return (
              <Card
                key={index}
                type="Document"
                title={content.title}
                files={content.files?.map((f: any) => ({
                  FileName: f.name ?? f.FileName,
                  FileURL: f.url ?? f.FileURL,
                }))}
                tags={content.tags || []}
              />
            );
          } else if (content.type === "Video") {
            return (
              <Card
                key={index}
                type="Video"
                title={content.title}
                link={content.link || ""}
                tags={content.tags || []}
              />
            );
          } else if (content.type === "Tweet") {
            return (
              <Card
                key={index}
                type="Tweet"
                title={content.title}
                body={{
                  para: content.body?.paragraph || "",
                }}
                tags={content.tags || []}
              />
            );
          }
        })}
        
      </div>
    </>
  );
}
