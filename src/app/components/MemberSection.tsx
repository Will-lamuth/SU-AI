import { Member, SocialPlatform } from "../lib/interface";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

interface MemberSectionProps {
    members: Member[];
}

const socialIcon: Record<SocialPlatform, string> = {
    linkedin: "/instagram.png",
    github: "/github.png",
    email: "/email.png",
    discord: "/discord.png"
};

export default function MemberSection({members}: MemberSectionProps){
    return (
        <div className="w-full h-auto flex justify-center">
            <div className="w-[85%] h-full">
                <div className="my-14">
                    <h1 className="font-[550] text-[40px]">Meet the <span className="underline text-[#550000]">Club Officers</span></h1>
                    <p className="font-[400] text-[20px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="w-full h-[80vh] grid md:grid-cols-3">
                {members.map((member, idx) =>(
                    <div key={idx} className="w-full flex flex-col gap-3">
                        <div className="member-pic h-[150px] w-[150px] rounded-full bg-[#FFAEAE]">
                            {/* Image */}
                            {member.avatar && (
                                <Image
                                src={urlFor(member.avatar).width(400).url()}
                                alt={member.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-cover rounded-full"
                                />
                            )}
                        </div>
                        <div>
                            <h1 className="font-[550] text-[24px]">{member.name}</h1>
                            <h2 className="font-[500] text-[20px] text-[#4E4E4E]">{member.role}</h2>
                        </div>
                        <div className="flex gap-4 items-center">
                            {member.socials?.map((s, idx) => (
                                <a
                                key={idx}
                                href={s.platform === "email" ? `mailto:${s.url}` : s.url}
                                target={s.platform === "email" ? undefined : "_blank"}
                                rel={s.platform === "email" ? undefined : "noopener noreferrer"}>
                                <img src={socialIcon[s.platform]} className="h-5 w-auto hover:-translate-y-1 duration-100 ease-in-out"></img>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                </div>     
            </div>
        </div>
    );
}