import { useState, useRef, useEffect } from "react";

interface optionProps {
  setTypes: (type: string) => void;
}

export default function Dropdown(props: optionProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 cursor-pointer px-4 py-2 
          bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          Types ⌄
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg 
            ring-1 ring-black ring-opacity-5 z-10"
          >
            <div className="py-1">
              <button
                onClick={() => {
                  props.setTypes("Document");
                  setOpen(!open);
                }}
                className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Document
              </button>
              <button
                onClick={() => {
                  props.setTypes("Tweet");
                  setOpen(!open);
                }}
                className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Tweet
              </button>
              <button
                onClick={() => {
                  props.setTypes("Video");
                  setOpen(!open);
                }}
                className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Video
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
