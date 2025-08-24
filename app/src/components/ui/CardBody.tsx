interface Body {
  title: string;
  points?: string[];
  para?: string;
}

interface BodyProp {
  type: "Document" | "Video" | "Tweet";
  body?: Body;
  link?: string; 
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
        <div className="font-semibold text-lg mb-2">{props.body?.title}</div>

        <ul className="list-disc list-inside space-y-1 text-sm">
          {props.body?.points?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
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
    Tweet: <div className="max-h-[250px] py-2 overflow-auto">
      {props.body?.para}
    </div>
  };

  return <>{bodyElement[props.type]}</>;
}