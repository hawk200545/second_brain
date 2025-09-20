import PdfIcon from "./icons/PdfIcon";
import DownloadIcon from "./icons/DownloadIcon";

interface pdfProps{
    fileName : string;
    fileURL : string;
}
export default function PdfButtons(props: pdfProps){
    return (
      <>
        <div
          className="flex justify-between items-center gap-2 w-full
         text-purple-950 bg-purple-200 my-2
         transition-colors duration-200 p-2 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <PdfIcon />
            <span className="font-light text-xs select-text">
              {props.fileName}
            </span>
          </div>
          <a className="p-1 hover:bg-purple-300 rounded-lg cursor-pointer"
          href={props.fileURL} rel="noopener noreferer" target="_blank">
            {" "}
            <DownloadIcon />
          </a>
        </div>
      </>
    );
}