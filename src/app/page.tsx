import Image from "next/image";
import { client } from "./lib/sanity";
import { eventCard, simpleBlogCard } from "./lib/interface";
import Card from "./components/Card";
import EventCard from "./components/EventCard";

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

      {/* Projects/events section */}
      <div className="w-full bg-[#550000] flex justify-center">

        <div className="bg-[#f0eeea] w-[85%] min-h-[150ox] flex gap-2.5 overflow-y-hidden">

            {/* Project heading & topics */}
          <div className="bg-[#550000] w-[70%] pt-14 pb-2 z-8 md:pr-8 2xl:pr-16">
            <h1 className="text-white font-medium text-[2.5rem]">Explore our <span className="underline text-[#E4A700]">Projects</span></h1>
            <p className="text-white text-[1.25rem]">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div className="flex flex-row flex-wrap">
            {topics.map((tag: string, idx: number) =>(
              <div key={idx} className="mt-2.5 px-4 py-2 bg-[#884C4C] text-white text-sm rounded-full mr-2 hover:bg-white hover:text-black hover:scale-[102%] transition transform duration-300 cursor-pointer">
                {tag}
              </div>
            ))}
            </div>
          </div>

          {/* Event heading */}
          <div className="bg-[#550000] w-[30%] pt-14 pb-2 z-8 md:pl-8 2xl:pl-16">
            <h1 className="text-white font-medium text-[2.5rem]"><span className="underline text-[#E4A700]">Events</span></h1>
            <p className="text-white text-[1.25rem]">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
           
        </div>
      </div>
      
      {/* Projects and Events */}
      <div className="w-full bg-[#550000] flex justify-center">

        <div className="bg-[#F0EEEA] w-[85%] h-[100vh] flex gap-2.5 overflow-y-hidden">
            
          <div className="bg-[#550000] w-[70%] flex flex-col h-[100vh] md:pr-8 2xl:pr-16">
            
            <div className="flex-1 overflow-scroll overflow-x-hidden w-full pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 2xl:gap-12 ">
                {data.map((post, idx) => (
                  <Card
                    key = {idx} 
                    title = {post.title}
                    description= {post.smallDescription}
                    image={post.titleImage}
                    href={post.currentSlug}
                    tags={Array.isArray(post.Topics) ? post.Topics : post.Topics ? [post.Topics] : []} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-[30%] h-[100vh] flex flex-col bg-[#550000] md:pl-8 2xl:pl-16">
          
            <div className="flex-1 overflow-scroll overflow-x-hidden w-full pt-2">
              <div className="grid grid-cols-1 md:gap-6 2xl:gap-12">
                {event.map((post, idx) => (
                  <EventCard
                    key = {idx} 
                    title = {post.title}
                    description= {post.smallDescription}
                    image={post.titleImage}
                    date={post.eventTime}
                  />
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* team section */}
      <div className="h-[500px] w-full"></div>
      
    </div>
  );
}
