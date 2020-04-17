import { Article } from './article';
import { Comment } from './comment'

export interface Thread extends Article {
    id: string,
    comments: Comment[],
    score: number
}
