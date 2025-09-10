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

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card
          key = {idx} 
          title = {post.title}
          description= {post.smallDescription}
          image={post.titleImage}
        />
      ))}
    </div>
  );
}
