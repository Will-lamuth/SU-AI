import Image from "next/image";
import { client } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import Card from "./components/Card";

async function getData(){
   const query = `
   *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="w-full flex flex-col justify-center items-center">

      {/* hero section/landing section */}
      <div className="h-[500px] w-full"></div>

      {/* Projects/events section */}
      <div className="w-full bg-[#550000] flex justify-center">
        <div className="bg-[#F0EEEA] w-[85%] flex flex-col md:flex-row gap-2.5">

          <div className="bg-[#550000] w-[70%] h-full flex justify-baseline">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 2xl:gap-12">
              {data.map((post, idx) => (
                <Card
                  key = {idx} 
                  title = {post.title}
                  description= {post.smallDescription}
                  image={post.titleImage}
                  href={post.currentSlug}
                />
              ))}
            </div>
          </div>

          <div className="w-[30%] h-full bg-[#550000]"></div>

        </div>
      </div>

      {/* team section */}
      <div className="h-[500px] w-full"></div>
      
    </div>
  );
}
