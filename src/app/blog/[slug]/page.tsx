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

    return (
        <div>
            <h1>{data.title}</h1>
            
            <Image src={urlFor(data.titleImage).url()} width={400} height={400} alt="Title image"/>

            {data.Content && (
                <div className="prose max-w-none">
                    <PortableText value={data.Content} />
                </div>
            )}
        </div>
    );
}