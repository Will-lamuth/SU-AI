import { FullArticle } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getData(slug: string){
    const query = `
    *[_type == 'blog' && slug.current == '${slug}']{
        "currentSlug": slug.current,
        title,
        Content,
        titleImage,
        Date,
        author->{
            name,
            role,
            avatar,
            socials,
        }
    }[0]`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
    const data: FullArticle = await getData(slug);
    console.log(data);

    const articleDate = data.Date ? new Date(data.Date) : null;


    return (
        <div className="w-full flex justify-center">
            <div className="w-[85%] bg-white">
                <h1 className="font-medium text-[2.5rem]">{data.title}</h1>
                
                <div className="relative w-full h-[600px] bg-gray-50">
                    <Image src={urlFor(data.titleImage).url()} fill className="object-cover" alt="Title image"/>
                </div>

                <h1>{data.author.name}</h1>
                
                <div className="w-full h-auto flex justify-center">
                {data.Content && (
                    <div className="w-[50%] prose max-w-none text-2xl">
                        <PortableText value={data.Content}/>
                        <h1>{data.author.name}</h1>
                        <p>{articleDate ? articleDate.toLocaleDateString("en-US") : "No date"}</p>
                    </div>
                )}
                </div>
            </div>
        </div>
        
    );
}