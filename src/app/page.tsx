import Image from "next/image";
import { client } from "./lib/sanity";
import { Member, eventCard, simpleBlogCard } from "./lib/interface";
import ProjectSection from "./components/ProjectSection";
import MemberSection from "./components/MemberSection";

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

async function getMembers(){
  const query = `
  *[_type == "member" && role != "Member"] | order(role asc) {
    name,
    role,
    avatar,
    "socials": socials[]{
      platform,
      url
    }
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  const topics = await getTopics();
  const event: eventCard[] = await getEvent();
  const members: Member[] = await getMembers();

  console.log("Members:", members);
  return (
    <div className="w-full flex flex-col justify-center items-center">

      {/* hero section/landing section */}
      <div className="h-[100vh] w-full flex justify-center items-end">

          <div className="w-[85%] h-[70%] bg-white">
          <Image
              src="/lightbulb_book_halftone_light.webp"
              alt="landing"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
      </div>

      <ProjectSection data={data} topics={topics} event={event}/>

      {/* team section */}
      <MemberSection members={members}/>
      
    </div>
  );
}

