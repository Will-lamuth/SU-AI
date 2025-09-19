import Image from "next/image";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  image?: any; // Sanity image field
  href: string;
  tags?: { topic: string }[];
};

export default function Card({ title, description, image, href, tags }: CardProps) {
  return (
    <Link href={`/blog/${href}`}>
      <div className="z-10 shadow bg-white w-full md:h-[400px] 2xl:h-[500px] hover:scale-[100%] hover:border-white hover:border-3 transition transform duration-300 ease-in-out cursor-pointer">
        
        {/* Image container */}
        <div className="relative h-[70%] w-full">
          {/* Tags overlay */}
          <div className="absolute top-2 right-2 flex flex-wrap gap-2 z-5">
            {tags?.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#884C4C] border-white border-[1px] text-white text-sm rounded-full"
              >
                {t.topic} {/* Access the string from the object */}
              </span>
            ))}
          </div>

          {/* Image */}
          {image && (
            <Image
              src={urlFor(image).width(800).url()}
              alt={title}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Text content */}
        <div className="p-3">
          <h2 className="2xl:text-[1.5rem] md:text-[20px] font-[550]"><span className="underline">{title}</span> &gt; </h2>
          {description && <p className="mt-1 2xl:text-[18px] font-[300]">{description}</p>}
        </div>
      </div>
    </Link>
  );
}