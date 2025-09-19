import Image from "next/image";
import { client } from "./lib/sanity";
import { eventCard, simpleBlogCard } from "./lib/interface";
import Card from "./components/Card";
import EventCard from "./components/EventCard";
import ProjectSection from "./components/ProjectSection";

async function getData(){
   const query = `
   *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      Topics[]->{
        topic,
      }
  }`;
  const data = await client.fetch(query);
  return data;
}

async function getTopics(){
  const query = `*[_type == 'topics'].topic`
  const data = await client.fetch(query);
  return data;
}

async function getEvent(){
  const query = `
   *[_type == 'event'] | order(_createdAt desc) {
      title,
      smallDescription,
      titleImage,
      eventTime,
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  const topics = await getTopics();
  const event: eventCard[] = await getEvent();

  console.log(data);
  console.log(topics);
  console.log("event times", event);
  return (
    <div className="w-full flex flex-col justify-center items-center">

      {/* hero section/landing section */}
      <div className="h-[500px] w-full"></div>

      <ProjectSection data={data} topics={topics} event={event}/>

      {/* team section */}
      <div className="h-[500px] w-full"></div>
      
    </div>
  );
}

