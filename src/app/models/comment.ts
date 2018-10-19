export class Comment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: Date;
    author: {
        username: string,
        bio: string,
        image: string,
        following: string
    };
}

