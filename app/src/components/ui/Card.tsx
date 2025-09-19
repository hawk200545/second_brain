import CardTop from "./CardTop";
import { CardBody } from "./CardBody";
import { Document } from "../../assets/document";
import { Video } from "../../assets/video";
import { Twitter } from "../../assets/twitter";
import { Button } from "./Button";
interface file{
  FileName : string;
  FileURL : string;
}
interface body{
  para:string;
}
interface CardProps {
  type: "Tweet" | "Document" | "Video";
  title: string;
  link?: string;
  tags?: string[];
  files?: file[];
  body?:body;
  created_at?: Date;
}
const startIcon = {
  Document: <Document size={25} />,
  Video: <Video size={25} />,
  Tweet: <Twitter size={30} />,
};
export default function Card(props: CardProps) {
  return (
    <>
      <div
        className="col-span-1 min-w-[200px] min-h-[250px] bg-violet-100 border-2
         border-violet-300 rounded-lg p-3 shadow-lg"
      >
        <div className="h-full flex flex-col justify-between">
          <CardTop title={props.title} startIcon={startIcon[props.type]} />
          <CardBody type={props.type} file={props.files} body={props.body} link={props.link} />
          <div className="flex gap-1">
            {props.tags?.map((value, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                text={"#" + value}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
