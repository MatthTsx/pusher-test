
export type UsViewer = {
    id: string;
    Users: {
        image: string | null;
        name: string | null;
        OnlineStatus: string | null;
        LastOnline: Date | null;
        id: string
    }[];
    Messages: {
        text: string;
        isImage: boolean;
        author: {
            name: string | null;
        };
        CreatedAt: Date;
    }[];
}

export type UserViewer = Array<UsViewer> | undefined