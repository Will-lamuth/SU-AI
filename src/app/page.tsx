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
      <div className="h-[120vh] w-full flex justify-center items-end relative">

          <div className="absolute z-5 top-10 w-[85%] h-[45%] flex flex-col gap-0">
            <div className="w-full h-1/3 flex justify-between gap-10 items-center">
              <h1 className="text-[150px] font-bold">artificial</h1>
              <div className="w-[35%] h-full flex flex-col justify-around">
                <p className="text-[20px]">Salisbury University's artificial intelligence initiative. Join today to learn and explore the world of AI.</p>
                <button className="bg-black text-white text-[20px] px-3 w-[100px]">Join</button>
              </div>
            </div>
            <div className="w-full flex justify-center items-center text-center h-1/3 ">
              <h1 className="text-[150px] font-bold bg-gradient-to-r from-[#E4A700] to-[#7E5D00] bg-clip-text text-transparent">intelligence</h1>
            </div>
            <div className="w-full flex justify-center items-center text-center h-1/3 ">
              <h1 className="text-[150px] font-bold">club</h1>
            </div> 
          </div>

          <div className="w-[85%] h-[600px] bg-white relative">
          <Image
              src="/lightbulb_book_halftone_light.webp"
              alt="landing"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
      </div>
      <div className="h-[50vh] w-full flex flex-col justify-center items-center text-center">
        <div className="w-[85%] h-[40%] flex flex-col justify-center items-center ">
          <h1 className="underline text-[#550000] font-[550] text-[40px]">Get in touch </h1>
          <p className="text-[20px] font-[500]">Stay up to date with the latest from AI Club</p>
        </div>
        <div className="w-[85%] h-[60%] flex justify-around items-center">
          <div className="w-[25%] h-full flex flex-col justify-around items-center">
            <img src="/email.png" className="h-[50px] w-[50px]"></img>
            <h1 className="font-[550] text-[32px]">Email</h1>
            <p className="font-[500] text-[20px]">Have a question? Email us at suaiclub@gmail.com</p>
          </div>
          <div className="w-[25%] h-full flex flex-col justify-around items-center">
            <img src="/instagram.png" className="h-[50px] w-[50px]"></img>
            <h1 className="font-[550] text-[32px]">Instagram</h1>
            <p className="font-[500] text-[20px]">Follow us on instagram to be notified on upcoming events @salisburyaiclub</p>
          </div>
          <div className="w-[25%] h-full flex flex-col justify-around items-center">
            <img src="/discord.png" className="h-[50px] w-[50px]"></img>
            <h1 className="font-[550] text-[32px]">Discord</h1>
            <p className="font-[500] text-[20px]">Join our Discord to connect, collaborate, and stay updated on all things AI</p>
          </div>
        </div>
      </div>

      <ProjectSection data={data} topics={topics} event={event}/>

      {/* team section */}
      <MemberSection members={members}/>
      
    </div>
  );
}

