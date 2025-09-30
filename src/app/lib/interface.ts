export interface articleTopics{
    topic: string;
}

export interface simpleBlogCard{
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
    Topics: articleTopics[];
}

export type SocialPlatform = "linkedin" | "github" | "email" | "discord";

export interface Member {
    name: string;
    role: string;
    avatar?: any;
    socials?: { platform: SocialPlatform; url: string }[];
  }

export interface FullArticle{
    title: string;
    Content: any;
    currentSlug: string;
    titleImage: any;
    author: Member;
    Date: Date;
}

export interface eventCard{
    title: string;
    titleImage: any;
    eventTime: Date;
    smallDescription: string;
}
