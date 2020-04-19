import { Article } from './article';
import { Comment } from './comment'
import { Vote } from './vote';

export interface Thread extends Article {
    id: string,
    comments: Comment[],
    score: number,
    replyCount: number
}
