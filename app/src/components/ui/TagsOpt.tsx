import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";
import { Button } from "./Button";

interface Props {
  type: string;
}

export default function TagsOpt({ type }: Props){
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useContext must be used within a AppProvider");
    }
    const { tags, setTags } = context;
    const [tagInput, setTagInput] = useState<string>("");

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={handleTags}
              className="w-full border-2 border-gray-300 rounded-md p-2"
            />
            <Button variant="secondary" size="md" onClick={handleAddTag} text="Add"/>
          </div>
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </>
    );

}