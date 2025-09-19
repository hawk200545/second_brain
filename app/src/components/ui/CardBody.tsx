import PdfButtons from "./PdfButton";
interface body{
  para:string;
}
interface file {
  FileName: string;
  FileURL: string;
}

interface BodyProp {
  type: "Document" | "Video" | "Tweet";
  file?: file[];
  link?: string;
  body?:body;
}

function getEmbedUrl(youtubeUrl: string): string {
  try {
    const url = new URL(youtubeUrl);

    if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
      const videoId = url.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.slice(1); // remove leading /
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return youtubeUrl;
  } catch {
    return youtubeUrl;
  }
}

export function CardBody(props: BodyProp) {
  const bodyElement = {
    Document: (
      <div className="p-3">
        {props.file?.map(file => (
          <PdfButtons key={file.FileName} fileName={file.FileName} fileURL={file.FileURL} />
        ))}
      </div>
    ),
    Video: (
      <div className="my-3 rounded-lg overflow-clip">
        <iframe
          className="w-full aspect-[16/9]"
          src={props.link ? getEmbedUrl(props.link) + "?controls=0" : ""}
          title="YouTube video player"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    ),
    Tweet: (
      <div className="max-h-[250px] py-2 overflow-auto">{props.body?.para}</div>
    ),
  };

  return (
    <>
      <div className="flex justify-start flex-col overflow-auto max-h-[275px] my-1">{bodyElement[props.type]}</div>
    </>
  );
}
