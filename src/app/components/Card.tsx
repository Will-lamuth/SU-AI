import Image from "next/image";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  image?: any; // Sanity image field
  href: string;
};

export default function Card({ title, description, image, href }: CardProps) {
  return (
    <Link href={`/blog/${href}`}>
        <div className="shadow bg-white h-[400px] w-[400px] hover:scale-[101%] transition transform duration-300 ease-in-out">
        {image && ( // conditional rendering
            <Image
            src={urlFor(image).width(400).url()} // build URL
            alt={title}
            width={400}
            height={400}
            className="h-[270px] object-cover"
            />
        )}
        <div className="px-2">
            <h2 className="text-xl font-bold mt-3">{title}</h2>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
        
        </div>
    </Link>
    
  );
}