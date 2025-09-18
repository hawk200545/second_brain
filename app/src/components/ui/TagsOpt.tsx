import React, { useState } from "react";
import { Button } from "./Button";
import { type RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {addTag} from '../../redux/tagsSlice'

export default function TagsOpt(){
    const dispatch = useDispatch();
    const tags = useSelector((state: RootState)=>state.tags);

    const [tagInput, setTagInput] = useState<string>("");

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };
    const handleKey = (e : React.KeyboardEvent<HTMLInputElement>)=>{
      console.log("trigger")
      if(e.key === "Enter"){
        handleAddTag();
      }
    }
    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            dispatch(addTag(tagInput));
            setTagInput("");
        }
    };

    return (
      <>
        <div className="flex flex-col justify-between gap-2 my-2 w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={handleTags}
              onKeyDown={handleKey}
              className="w-full border-2 border-gray-300 hover:border-gray-400 rounded-md p-2 text-sm placeholder:text "
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handleAddTag}
              text="Add"
            />
          </div>
          <div className="flex gap-2 truncate overflow-auto">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </>
    );

}