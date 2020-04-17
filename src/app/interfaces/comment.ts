import { User } from './user';

export interface Comment {
    content: string,
    parentId: string,
    user: User,
    createdAt: {
        _seconds: number,
        _nanoSeconds: number
    },
    score: number
}
