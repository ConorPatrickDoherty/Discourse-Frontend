import { User } from './user';
import { Vote } from './vote';

export interface Comment {
    id: string,
    content: string,
    parentId: string,
    user: User,
    createdAt: {
        _seconds: number,
        _nanoSeconds: number
    },
    score: number,
    replyCount: number
}
