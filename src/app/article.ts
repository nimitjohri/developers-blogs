import { Url } from 'url';

export class Article {
    title: string;
    slug: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    tagList: any;
    description: string;
    author: {
        username: string;
        bio: string;
        image: Url;
        following: boolean;
    };
}
