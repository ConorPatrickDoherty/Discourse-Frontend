import { Comment } from './comment'

export interface Article {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: {
        _seconds: number;
        _nanoSeconds: number;
    },
    content: string
}
