"use client";

import { useState } from "react";
import Card from "./Card";
import EventCard from "./EventCard";
import { eventCard, simpleBlogCard } from "../lib/interface";

interface ProjectsSectionProps {
    data: simpleBlogCard[];
    topics: string[];
    event: eventCard[];
  }

export default function ProjectSection({ data, topics, event }: ProjectsSectionProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
      };

    const filteredData = selectedTags.length > 0
      ? data.filter((post) =>
          post.Topics?.some((t: { topic: string }) => selectedTags.includes(t.topic))
        )
      : data;

        return (
            <>
                {/* Projects/events section */}
                <div className="w-full bg-[#550000] flex justify-center">
                    <div className="bg-[#f0eeea] w-[85%] min-h-[150ox] flex gap-2.5 overflow-y-hidden">
                        {/* Project heading & topics */}
                    <div className="bg-[#550000] w-[70%] pt-14 pb-2 z-8 md:pr-8 2xl:pr-16">
                        <h1 className="text-white font-[550] text-[2.5rem]">Explore our <span className="underline text-[#E4A700]">Projects</span></h1>
                        <p className="text-white text-[1.25rem] font-[300]">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        <div className="flex flex-row flex-wrap">
                        {topics.map((tag: string, idx: number) => (
                            <div
                            key={idx}
                            onClick={() => toggleTag(tag)}
                            className={`mt-2.5 px-4 py-2 rounded-full mr-2 cursor-pointer transition transform duration-300 ${
                                selectedTags.includes(tag)
                                ? "bg-white text-black"
                                : "bg-[#884C4C] text-white hover:bg-white hover:text-black"
                            }`}
                            >
                            {tag}
                            </div>
                        ))}
                        </div>
                    </div>
                    {/* Event heading */}
                    <div className="bg-[#550000] w-[30%] pt-14 pb-2 z-8 md:pl-8 2xl:pl-16">
                        <h1 className="text-white font-[550] text-[2.5rem]"><span className="underline text-[#E4A700]">Events</span></h1>
                        <p className="text-white text-[1.25rem] font-[300]">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                    </div>    
                    </div>
                </div>  

                <div className="w-full bg-[#550000] flex justify-center">
                    <div className="bg-[#F0EEEA] w-[85%] h-[100vh] flex gap-2.5 overflow-y-hidden">
                        <div className="bg-[#550000] w-[70%] flex flex-col h-[100vh] md:pr-8 2xl:pr-16"> 
                            <div className="flex-1 overflow-scroll overflow-x-hidden w-full py-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 2xl:gap-12 ">
                                    {filteredData.map((post, idx) => (
                                    <Card
                                        key={idx}
                                        title={post.title}
                                        description={post.smallDescription}
                                        image={post.titleImage}
                                        href={post.currentSlug}
                                        tags={
                                        Array.isArray(post.Topics)
                                            ? post.Topics
                                            : post.Topics
                                            ? [post.Topics]
                                            : []
                                        }
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] h-[100vh] flex flex-col bg-[#550000] md:pl-8 2xl:pl-16">
                            <div className="flex-1 overflow-scroll overflow-x-hidden w-full pt-2">
                                <div className="grid grid-cols-1 md:gap-6 2xl:gap-12">
                                    {event.map((post, idx) => (
                                    <EventCard
                                        key = {idx} 
                                        title = {post.title}
                                        description= {post.smallDescription}
                                        image={post.titleImage}
                                        date={post.eventTime}
                                    />
                                    ))}
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </>
        );
}