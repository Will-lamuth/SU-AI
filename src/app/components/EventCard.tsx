import Image from "next/image";
import { urlFor } from "../lib/sanity";
import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  image?: any; // Sanity image field
  date: string | Date;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" ,"Sep", "Oct", "Nov", "Dec"]

export default function Card({ title, description, image, date}: CardProps) {

    const eventDate = new Date(date);
    const day = eventDate.getUTCDate().toString();
    const month = (eventDate.getUTCMonth()+1);
    const year = eventDate.getFullYear().toString();
    console.log(day, month, year);

    return (
        <div className="w-full md:h-[400px] 2xl:h-[500px] hover:scale-[101%] transition transform duration-300 ease-in-out cursor-pointer">
        
        {/* Image container */}
        <div className="relative h-[70%] w-full">

            <div className="absolute top-2 right-2 z-5 h-[100px] w-[100px] bg-[#E4A700] flex flex-col justify-center items-center gap-3">
                <h1 className="text-2xl">{day}</h1>
                <span className="flex gap-2">
                    <p>{months[month]}</p>
                    <p>{year}</p>
                </span>
                
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
        <div className="px-2 py-2">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {description && <p className="text-white mt-1">{description}</p>}
        </div>
        </div>
    );
    }