import { Article } from './article';

export interface Thread extends Article {
    id: string,
    comments: Comment[],
    score: number
}
