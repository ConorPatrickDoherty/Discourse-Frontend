import { Article } from './article';
import { Comment } from './comment'
import { Vote } from './vote';

export interface Thread extends Article {
    id: string,
    category: string,
    comments: Comment[],
    score: number,
    replyCount: number
}
