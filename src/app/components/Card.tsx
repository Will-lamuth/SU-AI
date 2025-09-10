import Image from "next/image";
import { urlFor } from "../lib/sanity";

type CardProps = {
  title: string;
  description?: string;
  image?: any; // Sanity image field
};

export default function Card({ title, description, image }: CardProps) {
  return (
    <div className="border rounded-lg shadow p-4">
      {image && (
        <Image
          src={urlFor(image).width(600).url()} // build URL
          alt={title}
          width={400}
          height={400}
          className="rounded-md h-[200px] object-cover"
        />
      )}
      <h2 className="text-xl font-bold mt-3">{title}</h2>
      {description && <p className="text-gray-600 mt-2">{description}</p>}
    </div>
  );
}