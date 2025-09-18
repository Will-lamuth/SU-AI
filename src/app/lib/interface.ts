export interface articleTopics{
    topic: string;
}

export interface simpleBlogCard{
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
    Topics: articleTopics;
}

export interface Member {
    name: string;
    role: string;
    avatar?: any;
    socials?: { platform: string; url: string }[];
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
