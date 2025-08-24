import Card from "./Card";
export default function HomeContents() {
  return (
    <>
      <div className="grid justify-items-stretch grid-cols-3 gap-5">
        <Card
          type="Document"
          title="Second Brain"
          body={{ title: "Second Brain", points: ["Point 1", "Point 2"] }}
          tags={["Hello", "Hi"]}
        />
        <Card
          type="Video"
          title="Coolie Review"
          link="https://www.youtube.com/watch?v=ydOT0ZbPs9o"
          tags={["jk", "coolie"]}
        />
        <Card
          type="Tweet"
          title="Arangam Athiratume"
          body={{
            title: "Arangam Athiratume",
            para: "Coolie is a 2025 Indian Tamil-language action thriller film directed by Lokesh Kanagaraj and produced by Kalanithi Maran under Sun Pictures. The film features an ensemble cast including Rajinikanth, Nagarjuna Akkineni, Soubin Shahir, Upendra, Shruti Haasan, Sathyaraj and Rachita Ram, with Aamir Khan and Pooja Hegde in special appearances. In the film, a former coolie union leader investigates the death of his friend which leads him to a crime syndicate.",
          }}
          tags={["Ani", "Music"]}
        />
        <Card
          type="Document"
          title="Third Brain"
          body={{ title: "Third Brain", points: ["Point A", "Point B"] }}
          tags={["Third","Help"]}
        />
      </div>
    </>
  );
}
